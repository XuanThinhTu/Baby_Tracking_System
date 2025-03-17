package com.swd.project.service;

import com.swd.project.dto.request.FeedbackRequest;
import com.swd.project.dto.response.FeedbackDTO;

public interface IFeedbackService {

    FeedbackDTO createFeedback(FeedbackRequest request);
}
