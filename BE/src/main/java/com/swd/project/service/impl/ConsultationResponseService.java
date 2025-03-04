package com.swd.project.service.impl;

import com.swd.project.dto.response.ConsultationResponseCreation;
import com.swd.project.dto.response.ConsultationResponseDTO;
import com.swd.project.entity.ConsultationRequest;
import com.swd.project.entity.ConsultationResponse;
import com.swd.project.entity.User;
import com.swd.project.mapper.ConsultationResponseMapper;
import com.swd.project.repository.ConsultationRequestRepository;
import com.swd.project.repository.ConsultationResponseRepository;
import com.swd.project.service.IConsultationResponseService;
import com.swd.project.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ConsultationResponseService implements IConsultationResponseService {

    private final ConsultationRequestRepository consultationRequestRepository;
    private final ConsultationResponseRepository consultationResponseRepository;
    private final IUserService userService;
    private final ConsultationResponseMapper consultationResponseMapper;

    @Override
    public ConsultationResponseDTO addConsultationResponse(int consultationId, ConsultationResponseCreation response) {
        ConsultationRequest consultationRequest = consultationRequestRepository.findById(consultationId)
                .orElseThrow(() -> new RuntimeException("Consultation request not found"));
        User user = userService.getAuthenticatedUser();
        if (user.getId() == consultationRequest.getParent().getId() || user.getId() == consultationRequest.getDoctor().getId()) {
            ConsultationResponse consultationResponse = new ConsultationResponse();
            consultationResponse.setUser(user);
            consultationResponse.setContent(response.getContent());
            consultationResponse.setConsultationRequest(consultationRequest);
            consultationResponse.setCreatedAt(LocalDateTime.now());
            consultationResponse = consultationResponseRepository.save(consultationResponse);
            return consultationResponseMapper.toConsultationResponseDTO(consultationResponse);
        }else{
            throw new RuntimeException("You are not allowed to add response to this consultation request");
        }
    }
}
