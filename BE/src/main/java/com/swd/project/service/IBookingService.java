package com.swd.project.service;

import com.swd.project.dto.response.BookingAvailableResponse;
import com.swd.project.dto.response.BookingResponse;
import com.swd.project.entity.Booking;
import com.swd.project.entity.SlotTime;
import com.swd.project.entity.User;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

public interface IBookingService {
    List<LocalDate> getAvailableBookingDates(YearMonth month);
    List<SlotTime> getAvailableSlotsByDate(LocalDate date);
    BookingResponse createBooking(int childrenId, LocalDate date, int slotTimeId, String note);
    BookingAvailableResponse getAvailableBookingResponse(YearMonth month);
    String generateGoogleMeetLink(User member, User doctor);
    List<BookingResponse> getAllBookings();
    void cancelBooking(int bookingId);
}
