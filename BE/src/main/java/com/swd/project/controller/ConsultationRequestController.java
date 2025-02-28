package com.swd.project.controller;

import com.swd.project.dto.request.ConsultationRequestCreation;
import com.swd.project.dto.response.ApiResponse;
import com.swd.project.dto.response.ConsultationRequestDTO;
import com.swd.project.service.IConsultationRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/consultation")
@RequiredArgsConstructor
public class ConsultationRequestController {

    private final IConsultationRequestService iConsultationRequestService;

    @PostMapping("/request")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<ConsultationRequestDTO> createConsultationRequest(@RequestBody ConsultationRequestCreation request) {
        return ApiResponse.<ConsultationRequestDTO>builder()
                .message("Consultation request created")
                .data(iConsultationRequestService.createConsultationRequest(request))
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<ConsultationRequestDTO> getConsultationRequestById(@PathVariable int id) {
        return ApiResponse.<ConsultationRequestDTO>builder()
                .message("Consultation request")
                .data(iConsultationRequestService.getConsultationRequestById(id))
                .build();
    }

    @GetMapping("/all-request")
    public ApiResponse<Page<ConsultationRequestDTO>> getAllConsultationRequest(@RequestParam(defaultValue = "0") int page,
                                                                          @RequestParam(defaultValue = "10") int size) {
        return ApiResponse.<Page<ConsultationRequestDTO>>builder()
                .message("All consultation request")
                .data(iConsultationRequestService.getAllConsultationRequest(page, size))
                .build();
    }

    @GetMapping("/pending-request")
    @PreAuthorize("hasRole('ROLE_DOCTOR') or hasRole('ROLE_ADMIN')")
    public ApiResponse<Page<ConsultationRequestDTO>> getPendingConsultation(@RequestParam(defaultValue = "0") int page,
                                                                          @RequestParam(defaultValue = "10") int size) {
        return ApiResponse.<Page<ConsultationRequestDTO>>builder()
                .message("Pending consultation request")
                .data(iConsultationRequestService.getPendingConsultationRequest(page, size))
                .build();
    }

}
