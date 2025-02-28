package com.swd.project.repository;

import com.swd.project.entity.ConsultationRequest;
import com.swd.project.enums.ConsultationStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConsultationRequestRepository extends JpaRepository<ConsultationRequest, Integer> {

    Page<ConsultationRequest> findAllByStatus(ConsultationStatus status, Pageable pageable);

}
