package com.swd.project.dto.response;

import com.swd.project.entity.Children;
import com.swd.project.entity.SlotTime;
import com.swd.project.entity.User;
import com.swd.project.enums.BookingStatus;
import com.swd.project.validator.DobConstraint;
import jakarta.persistence.*;
import lombok.Builder;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Builder
public record BookingResponse(
        int id,

        LocalDate date,

        String content,

        String meetingLink,

        BookingStatus status,

        LocalDateTime createdAt,

        int childrenId,

        String childName,

        Date childBirthDate,

        String childGender,

        int doctorId,

        String doctorFirstName,

        String doctorLastName,

        int slotTimeId,

        LocalTime startTime,

        LocalTime endTime
) {
}
