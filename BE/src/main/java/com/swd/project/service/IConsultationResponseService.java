package com.swd.project.service;

import com.swd.project.dto.response.ConsultationResponseCreation;
import com.swd.project.dto.response.ConsultationResponseDTO;
import org.springframework.data.domain.Page;

public interface IConsultationResponseService {

    ConsultationResponseDTO addConsultationResponse(int consultationId, ConsultationResponseCreation response);

    Page<ConsultationResponseDTO> getConsultationResponsesByConsultationId(int consultationId, int page, int size);
}
