package com.swd.project.repository;

import com.swd.project.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {

    List<Feedback> findByDoctorId(int doctorId);
}
