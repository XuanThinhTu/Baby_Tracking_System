package com.swd.project.service;

import com.swd.project.dto.response.ConsultationRequestDTO;

public interface IConsultationRequestService {

    ConsultationRequestDTO createConsultationRequest(String title);
}
