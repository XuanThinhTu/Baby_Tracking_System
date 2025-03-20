package com.swd.project.dto.response;

import com.swd.project.entity.Category;
import jakarta.persistence.ManyToOne;
import lombok.Builder;

@Builder
public record FAQResponse(
        int id,
        String question,
        String answer,
        Category category,
        boolean isDeleted
) {
    @Builder
    public record Category(
            int id,
            String title,
            String description
    ) {

    }
}
