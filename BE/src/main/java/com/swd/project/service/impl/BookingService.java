package com.swd.project.service.impl;

import com.swd.project.dto.response.BookingAvailableResponse;
import com.swd.project.entity.*;
import com.swd.project.exception.ResourceNotFoundException;
import com.swd.project.repository.*;
import com.swd.project.service.IBookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService implements IBookingService {

    private final WorkingScheduleRepository workingScheduleRepository;

    private final BookingRepository bookingRepository;

    private final EmailService emailService;

    private final UserRepository userRepository;

    private final ChildrenRepository childrenRepository;

    @Override
    public List<LocalDate> getAvailableBookingDates(YearMonth month) {
        LocalDate start = month.atDay(1);
        LocalDate end = month.atEndOfMonth();
        return workingScheduleRepository.findByDateBetween(start, end).stream()
                .filter(workingSchedule ->
                        !bookingRepository.existsByDateAndDoctorAndSlotTime(
                            workingSchedule.getDate(),
                            workingSchedule.getDoctor(),
                            workingSchedule.getSlotTime()
                ) && LocalDate.now().isBefore(workingSchedule.getDate()))
                .map(WorkingSchedule::getDate)
                .distinct()
                .sorted()
                .collect(Collectors.toList());
    }
//
//    public BookingAvailableResponse getAvailableBookingResponse(YearMonth month) {
//        List<LocalDate> availableDates = getAvailableBookingDates(month);
//        List<SlotTime> availableSlotTimes = availableDates.stream()
//                .map(this::getAvailableSlotsByDate)
//                .collect(Collectors.toList());
//
//        return new BookingAvailableResponse(month.toString(), localDates);
//    }

    @Override
    public List<SlotTime> getAvailableSlotsByDate(LocalDate date) {
        return workingScheduleRepository.findByDate(date).stream()
                .filter(workingSchedule ->
                        !bookingRepository
                                .existsByDateAndDoctorAndSlotTime(
                                        date,
                                        workingSchedule.getDoctor(),
                                        workingSchedule.getSlotTime()
                                ) && LocalDate.now().isBefore(date))
                .map(WorkingSchedule::getSlotTime)
                .collect(Collectors.toList());
    }

    @Override
    public Booking createBooking(int memberId, int childrenId, LocalDate date, int slotTimeId, String note) {
        List<WorkingSchedule> schedules = workingScheduleRepository.findByDateAndSlotTimeId(date, slotTimeId);
        WorkingSchedule availableSchedule = schedules.stream()
                .filter(ws -> !bookingRepository.existsByDateAndDoctorAndSlotTime(
                                date, ws.getDoctor(),
                                ws.getSlotTime()
                        ))
                .findAny()
                .orElseThrow(() -> new ResourceNotFoundException("No more available doctor for this slot."));

        User member = userRepository.findById(memberId)
                .orElseThrow(() -> new ResourceNotFoundException("Member with id: " + memberId + " not found"));
        Children child = childrenRepository.findById(childrenId)
                .orElseThrow(() -> new ResourceNotFoundException("Children with id: " + childrenId + " not found"));

        Booking booking = new Booking();
        booking.setDate(date);
        booking.setMember(member);
        booking.setChildren(child);
        booking.setDoctor(availableSchedule.getDoctor());
        booking.setSlotTime(availableSchedule.getSlotTime());
        booking.setContent(note);
        booking.setStatus(BookingStatus.CONFIRMED);  // Giả sử trạng thái CONFIRMED có trong enum
        booking.setCreatedAt(LocalDateTime.now());
        booking.setMeetingLink(generateGoogleMeetLink());

        bookingRepository.save(booking);

        // Gửi email xác nhận kèm link Google Meet
        emailService.sendBookingConfirmation(member.getEmail(), booking);

        return booking;
    }

    @Override
    public String generateGoogleMeetLink() {
        return "";
    }
}
