package com.swd.project.controller;

import com.swd.project.dto.response.ApiResponse;
import com.swd.project.dto.response.ConsultationResponseCreation;
import com.swd.project.dto.response.ConsultationResponseDTO;
import com.swd.project.service.IConsultationResponseService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/consultation-response")
@RequiredArgsConstructor
public class ConsultationResponseController {

    private final IConsultationResponseService consultationResponseService;

    @PostMapping("/{consultationRequestId}")
    @SecurityRequirement(name = "bearerAuth")
    public ApiResponse<ConsultationResponseDTO> sendConsultationResponse(@PathVariable int consultationRequestId,
                                                                         @RequestBody ConsultationResponseCreation response){
        return ApiResponse.<ConsultationResponseDTO>builder()
                .message("Consultation response added")
                .data(consultationResponseService.addConsultationResponse(consultationRequestId, response))
                .build();
    }
}
