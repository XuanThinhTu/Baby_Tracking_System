package com.swd.project.service;

import com.swd.project.entity.Booking;
import com.swd.project.entity.SlotTime;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

public interface IBookingService {
    List<LocalDate> getAvailableBookingDates(YearMonth month);
    List<SlotTime> getAvailableSlotsByDate(LocalDate date);
    Booking createBooking(int memberId, int childrenId, LocalDate date, int slotTimeId, String note);
    String generateGoogleMeetLink();
}
