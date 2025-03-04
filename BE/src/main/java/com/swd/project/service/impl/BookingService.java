package com.swd.project.service.impl;

import com.swd.project.dto.response.BookingAvailableResponse;
import com.swd.project.dto.response.BookingResponse;
import com.swd.project.entity.*;
import com.swd.project.enums.BookingStatus;
import com.swd.project.exception.ResourceNotFoundException;
import com.swd.project.mapper.BookingMapper;
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

    private final BookingMapper bookingMapper;

    private final EmailService emailService;

    private final UserRepository userRepository;

    private final ChildrenRepository childrenRepository;

    private final UserService userService;

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

    @Override
    public BookingAvailableResponse getAvailableBookingResponse(YearMonth month) {
        return BookingAvailableResponse.builder()
                .yearMonth(month.toString())
                .availableDates(
                        getAvailableBookingDates(month).stream()
                                .map(date -> BookingAvailableResponse.LocalDate.builder()
                                        .date(date.toString())
                                        .slotTimes(
                                                getAvailableSlotsByDate(date).stream()
                                                        .map(slot -> BookingAvailableResponse.LocalDate.SlotTime.builder()
                                                                .slotTimeId(slot.getId())
                                                                .startTime(slot.getStartTime().toString())
                                                                .endTime(slot.getEndTime().toString())
                                                                .build())
                                                        .collect(Collectors.toList())
                                        )
                                        .build())
                                .collect(Collectors.toList())
                )
                .build();
    }


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
    public BookingResponse createBooking(int childrenId, LocalDate date, int slotTimeId, String note) {
        List<WorkingSchedule> schedules = workingScheduleRepository.findByDateAndSlotTimeId(date, slotTimeId);
        WorkingSchedule availableSchedule = schedules.stream()
                .filter(ws -> !bookingRepository.existsByDateAndDoctorAndSlotTime(
                                date, ws.getDoctor(),
                                ws.getSlotTime()
                        ))
                .findAny()
                .orElseThrow(() -> new ResourceNotFoundException("No more available doctor for this slot."));

        User member = userService.getAuthenticatedUser();
        User doctor = availableSchedule.getDoctor();
        Children child = childrenRepository.findById(childrenId)
                .orElseThrow(() -> new ResourceNotFoundException("Children with id: " + childrenId + " not found"));

        Booking booking = new Booking();
        booking.setDate(date);
        booking.setMember(member);
        booking.setChildren(child);
        booking.setDoctor(doctor);
        booking.setSlotTime(availableSchedule.getSlotTime());
        booking.setContent(note);
        booking.setStatus(BookingStatus.PROCESSING);
        booking.setCreatedAt(LocalDateTime.now());
        booking.setMeetingLink(generateGoogleMeetLink(member, doctor));

        bookingRepository.save(booking);

        // Gửi email xác nhận kèm link Google Meet
        emailService.sendBookingConfirmation(member, booking);

        return bookingMapper.toDto(booking);
    }

    @Override
    public String generateGoogleMeetLink(User member, User doctor) {
        return GoogleMeetService.generateGoogleMeetLink(member, doctor);
    }

    @Override
    public List<BookingResponse> getAllBookings() {
        return bookingRepository.findAll().stream()
                .map(bookingMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public void cancelBooking(int bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy booking với id: " + bookingId));

        // Nếu booking đã hủy hoặc hoàn thành thì không cho phép hủy nữa (tùy nghiệp vụ)
        if (booking.getStatus() == BookingStatus.CANCELLED || booking.getStatus() == BookingStatus.CLOSED) {
            throw new RuntimeException("Booking đã ở trạng thái không thể hủy");
        }

        booking.setStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);

    }
}
