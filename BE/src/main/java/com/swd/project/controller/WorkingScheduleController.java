package com.swd.project.controller;

import com.swd.project.dto.request.WorkScheduleRequest;
import com.swd.project.dto.response.ApiResponse;
import com.swd.project.dto.response.WorkingScheduleDTO;
import com.swd.project.enums.WorkingScheduleStatus;
import com.swd.project.service.IWorkingScheduleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/working-schedule")
@RequiredArgsConstructor
public class WorkingScheduleController {

    private final IWorkingScheduleService workingScheduleService;

    @PostMapping("/register")
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('ROLE_DOCTOR')")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<WorkingScheduleDTO> registerWorkingSchedule(@RequestBody List<WorkScheduleRequest> requests) {
        return ApiResponse.<WorkingScheduleDTO>builder()
                .message("Working schedule registered")
                .data(workingScheduleService.registerWorkingSchedule(requests))
                .build();
    }

    @GetMapping("/doctor/{doctorId}")
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('ROLE_DOCTOR') or hasRole('ROLE_ADMIN')")
    public ApiResponse<List<WorkingScheduleDTO>> getDoctorSchedulesByStatus(@RequestParam(name = "status", defaultValue = "DRAFT") WorkingScheduleStatus status,
                                                                            @PathVariable int doctorId) {
        return ApiResponse.<List<WorkingScheduleDTO>>builder()
                .message("Working schedules retrieved")
                .data(workingScheduleService.getDoctorSchedulesByStatus(status,doctorId))
                .build();
    }

    @PostMapping("/submit")
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('ROLE_DOCTOR')")
    public ApiResponse<Void> submitWorkingSchedule(@RequestBody List<Integer> scheduleIds) {
        workingScheduleService.submitWorkingSchedule(scheduleIds);
        return ApiResponse.<Void>builder()
                .message("Working schedule submitted")
                .build();
    }
}
