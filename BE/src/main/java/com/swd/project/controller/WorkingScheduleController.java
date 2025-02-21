package com.swd.project.controller;

import com.swd.project.dto.response.ApiResponse;
import com.swd.project.dto.response.WorkingScheduleDTO;
import com.swd.project.service.IWorkingScheduleService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/working-schedule")
@RequiredArgsConstructor
public class WorkingScheduleController {

    private final IWorkingScheduleService workingScheduleService;

    @PostMapping("/register")
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('ROLE_DOCTOR')")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<WorkingScheduleDTO> registerWorkingSchedule(@RequestParam("slotTimeId") String slotTimeId,
                                                                   @RequestParam("date")String date) {
        return ApiResponse.<WorkingScheduleDTO>builder()
                .statusCode(HttpStatus.CREATED.value())
                .message("Working schedule registered")
                .data(workingScheduleService.registerWorkingSchedule(slotTimeId, date))
                .build();
    }
}
