package com.swd.project.dto.response;

import com.swd.project.entity.Children;
import lombok.Builder;

import java.util.Date;

@Builder
public record GrowthTrackerResponse(
        int id,
        Double height,
        Double weight,
        Double headCircumference,
        Double bmi,
        Date measuredAt,
        int childrenId
) {
}
