package com.swd.project.repository;

import com.swd.project.entity.ConsultationRequest;
import com.swd.project.entity.ConsultationResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConsultationResponseRepository extends JpaRepository<ConsultationResponse, Integer> {

    Page<ConsultationResponse> findByConsultationRequestId(int consultationRequestId, Pageable pageable);
}
