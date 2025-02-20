package com.swd.project.controller;

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
    public ApiResponse<ConsultationRequestDTO> createConsultationRequest(@RequestParam("title") String title) {
        return ApiResponse.<ConsultationRequestDTO>builder()
                .statusCode(HttpStatus.CREATED.value())
                .message("Consultation request created")
                .data(iConsultationRequestService.createConsultationRequest(title))
                .build();
    }

}
