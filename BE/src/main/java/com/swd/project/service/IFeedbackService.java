package com.swd.project.service;

import com.swd.project.dto.request.FeedbackRequest;
import com.swd.project.dto.response.FeedbackDTO;
import org.springframework.data.domain.Page;

import java.util.List;

public interface IFeedbackService {

    FeedbackDTO createFeedback(FeedbackRequest request);

    Page<FeedbackDTO> getAllFeedbacks(int page, int size);

    List<FeedbackDTO> getAllFeedbacksByDoctorID(int doctorId);
}
