package com.swd.project.controller;

import com.swd.project.dto.request.ConsultationRequestCreation;
import com.swd.project.dto.response.ApiResponse;
import com.swd.project.dto.response.ConsultationRequestDTO;
import com.swd.project.service.IConsultationRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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

}
