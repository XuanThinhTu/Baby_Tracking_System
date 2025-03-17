package com.swd.project.mapper;

import com.swd.project.dto.response.FeedbackDTO;
import com.swd.project.entity.Feedback;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FeedbackMapper {

    private final UserMapper userMapper;

    public FeedbackDTO toFeedbackDTO(Feedback feedback) {
        FeedbackDTO feedbackDTO = new FeedbackDTO();
        feedbackDTO.setId(feedback.getId());
        feedbackDTO.setRating(feedback.getRating());
        feedbackDTO.setComment(feedback.getComment());
        feedbackDTO.setCreatedAt(feedback.getCreatedAt());
        feedbackDTO.setFeedbackType(feedback.getFeedbackType());
        feedbackDTO.setMember(userMapper.toUserDTO(feedback.getMember()));
        feedbackDTO.setDoctor(userMapper.toUserDTO(feedback.getDoctor()));
        return feedbackDTO;
    }

}
