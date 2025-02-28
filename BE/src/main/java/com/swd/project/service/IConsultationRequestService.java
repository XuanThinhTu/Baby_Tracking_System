package com.swd.project.service;

import com.swd.project.dto.request.ConsultationRequestCreation;
import com.swd.project.dto.response.ConsultationRequestDTO;

public interface IConsultationRequestService {

    ConsultationRequestDTO createConsultationRequest(ConsultationRequestCreation request);
}
