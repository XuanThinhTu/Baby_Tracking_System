package com.swd.project.mapper;

import com.swd.project.dto.response.CategoryDTO;
import com.swd.project.dto.response.FAQResponse;
import com.swd.project.entity.Category;
import com.swd.project.entity.FAQ;
import org.springframework.stereotype.Component;

@Component
public class FAQMapper {
    public FAQResponse toDto(FAQ faq) {
        if (faq == null) {
            return null;
        }

        return FAQResponse.builder()
                .id(faq.getId())
                .question(faq.getQuestion())
                .answer(faq.getAnswer())
                .category(
                        FAQResponse.Category.builder()
                                .id(faq.getCategory().getId())
                                .title(faq.getCategory().getTitle())
                                .description(faq.getCategory().getDescription())
                        .build()
                )
                .isDeleted(faq.isDeleted())
                .build();
    }
}
