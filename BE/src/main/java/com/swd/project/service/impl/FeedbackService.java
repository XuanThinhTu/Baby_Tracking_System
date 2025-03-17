package com.swd.project.service.impl;

import com.swd.project.dto.request.FeedbackRequest;
import com.swd.project.dto.response.FeedbackDTO;
import com.swd.project.entity.Feedback;
import com.swd.project.entity.User;
import com.swd.project.mapper.FeedbackMapper;
import com.swd.project.repository.FeedbackRepository;
import com.swd.project.repository.UserRepository;
import com.swd.project.service.IFeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class FeedbackService implements IFeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final FeedbackMapper feedbackMapper;
    private final UserService userService;
    private final UserRepository userRepository;

    @Override
    public FeedbackDTO createFeedback(FeedbackRequest request) {
        Feedback feedback = new Feedback();
        feedback.setRating(request.getRating());
        feedback.setCreatedAt(LocalDateTime.now());
        feedback.setComment(request.getComment());
        feedback.setFeedbackType(request.getFeedbackType());
        feedback.setMember(userService.getAuthenticatedUser());
        User doctor = userRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        feedback.setDoctor(doctor);
        feedbackRepository.save(feedback);
        return feedbackMapper.toFeedbackDTO(feedback);
    }
}
