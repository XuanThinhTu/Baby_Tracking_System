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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

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

    @Override
    public Page<FeedbackDTO> getAllFeedbacks(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        Page<Feedback> feedbacks = feedbackRepository.findAll(pageRequest);
        return feedbacks.map(feedbackMapper::toFeedbackDTO);
    }

    @Override
    public List<FeedbackDTO> getAllFeedbacksByDoctorID(int doctorId) {
        List<Feedback> feedbacks = feedbackRepository.findByDoctorId(doctorId);
        return feedbacks.stream().map(feedbackMapper::toFeedbackDTO).toList();
    }
}
