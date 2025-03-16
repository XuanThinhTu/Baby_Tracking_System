package com.swd.project.service;

import com.swd.project.dto.request.ConsultationRequestCreation;
import com.swd.project.dto.response.ConsultationRequestDTO;
import com.swd.project.entity.ConsultationRequest;
import org.springframework.data.domain.Page;

import java.util.List;

public interface IConsultationRequestService {

    ConsultationRequestDTO createConsultationRequest(ConsultationRequestCreation request);

    Page<ConsultationRequestDTO> getPendingConsultationRequest(int page, int size);

    Page<ConsultationRequestDTO> getAllConsultationRequest(int page, int size);

    ConsultationRequestDTO getConsultationRequestById(int id);

    ConsultationRequestDTO assignDoctor(int consultationRequestId, int doctorId);

    List<ConsultationRequestDTO> getAllConsultationRequestByUser();
}
