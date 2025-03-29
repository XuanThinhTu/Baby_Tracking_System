package com.swd.project.service;

import com.swd.project.dto.request.FAQRequest;
import com.swd.project.dto.response.FAQResponse;

import java.util.List;

public interface IFAQService {
    List<FAQResponse> getAllFAQ();

    FAQResponse createFAQ(FAQRequest request);

    FAQResponse updateFAQ(int fqaId ,FAQRequest request);

    void deleteFAQ(int fqaId);
}
