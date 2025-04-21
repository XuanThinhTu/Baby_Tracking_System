package com.swd.project.mapper;

import com.swd.project.dto.response.ConsultationResponseDTO;
import com.swd.project.entity.ConsultationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ConsultationResponseMapper {

    private final UserMapper userMapper;

    public ConsultationResponseDTO toConsultationResponseDTO(ConsultationResponse response){
        ConsultationResponseDTO consultationResponseDTO = new ConsultationResponseDTO();
        consultationResponseDTO.setId(response.getId());
        consultationResponseDTO.setContent(response.getContent());
        consultationResponseDTO.setCreatedAt(response.getCreatedAt());
        consultationResponseDTO.setConsultationRequestId(response.getConsultationRequest().getId());
        consultationResponseDTO.setUser(userMapper.toUserDTO(response.getUser()));
        return consultationResponseDTO;
    }
}
