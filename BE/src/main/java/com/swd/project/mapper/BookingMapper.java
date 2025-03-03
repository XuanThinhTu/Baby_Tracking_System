package com.swd.project.mapper;

import com.swd.project.dto.response.BookingResponse;
import com.swd.project.entity.Booking;

public class BookingMapper {
    public BookingResponse toDto(Booking booking) {
        if (booking == null) {
            return null;
        }
        return new BookingResponse(
                booking.getId(),
                booking.getDate(),
                booking.getContent(),
                booking.getMeetingLink(),
                booking.getStatus(),
                booking.getCreatedAt(),
                booking.getChildren().getId(),
                booking.getChildren().getName(),
                booking.getChildren().getBirthDate(),
                booking.getChildren().getGender(),
                booking.getDoctor().getId(),
                booking.getDoctor().getFirstName(),
                booking.getDoctor().getLastName(),
                booking.getSlotTime().getId(),
                booking.getSlotTime().getStartTime(),
                booking.getSlotTime().getEndTime()
        );
    }
}
