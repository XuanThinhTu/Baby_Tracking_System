package com.swd.project.dto.request;

import com.swd.project.dto.response.FAQResponse;

public record FAQRequest(
        String question,
        String answer,
        int categoryId
) {
}
