package com.swd.project.dto.response;

import lombok.Builder;

import java.time.LocalDateTime;
import java.util.Date;

@Builder
public record GrowthTrackerResponse(
        int id,
        Double height,
        Double weight,
        Double headCircumference,
        Double bmi,
        LocalDateTime measuredAt,
        int childrenId
) {
}
