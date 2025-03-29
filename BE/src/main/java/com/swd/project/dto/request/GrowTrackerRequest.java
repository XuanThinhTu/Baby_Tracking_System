package com.swd.project.dto.request;

import jakarta.validation.constraints.NotNull;

import java.util.Date;

public record GrowTrackerRequest(
        @NotNull Double height,
        @NotNull Double weight,
        @NotNull Double headCircumference,
        String measuredAt
) {
}
