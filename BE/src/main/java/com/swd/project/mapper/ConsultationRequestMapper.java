package com.swd.project.mapper;

import com.swd.project.dto.response.ConsultationRequestDTO;
import com.swd.project.entity.ConsultationRequest;
import org.springframework.stereotype.Component;

@Component
public class ConsultationRequestMapper {

    public ConsultationRequestDTO toConsultationRequestDTO(ConsultationRequest request) {
        ConsultationRequestDTO consultationRequestDTO = new ConsultationRequestDTO();
        consultationRequestDTO.setId(request.getId());
        consultationRequestDTO.setRequestTitle(request.getRequestTitle());
        consultationRequestDTO.setNote(request.getNote());
        consultationRequestDTO.setRequestDate(request.getRequestDate());
        consultationRequestDTO.setParentId(request.getParent().getId());
        consultationRequestDTO.setParentName(request.getParent().getFirstName() + " " + request.getParent().getLastName());
        consultationRequestDTO.setChildId(request.getChild().getId());
        consultationRequestDTO.setChildName(request.getChild().getName());
        if(request.getDoctor() != null) {
            consultationRequestDTO.setDoctorId(request.getDoctor().getId());
            consultationRequestDTO.setDoctorName(request.getDoctor().getFirstName() + " " + request.getDoctor().getLastName());
        }
        return consultationRequestDTO;
    }
}
