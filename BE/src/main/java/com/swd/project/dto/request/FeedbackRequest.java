package com.swd.project.dto.request;

import com.swd.project.enums.FeedbackType;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class FeedbackRequest {

    private double rating;
    private String comment;
    private FeedbackType feedbackType;
    private int doctorId;
}
