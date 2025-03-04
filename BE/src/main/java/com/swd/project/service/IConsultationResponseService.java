package com.swd.project.service;

import com.swd.project.dto.response.ConsultationResponseCreation;
import com.swd.project.dto.response.ConsultationResponseDTO;

public interface IConsultationResponseService {

    ConsultationResponseDTO addConsultationResponse(int consultationId, ConsultationResponseCreation response);
}
