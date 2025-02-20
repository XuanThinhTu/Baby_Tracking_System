package com.swd.project.repository;

import com.swd.project.entity.ConsultationRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConsultationRequestRepository extends JpaRepository<ConsultationRequest, Integer> {
}
