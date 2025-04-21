package com.swd.project.mapper;

import com.swd.project.dto.response.BlogImageDTO;
import com.swd.project.entity.BlogImage;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class BlogImageMapper {

    public BlogImageDTO toBlogImageDTO(BlogImage blogImage) {
        return BlogImageDTO.builder()
                .id(blogImage.getId())
                .url(blogImage.getUrl())
                .publicId(blogImage.getPublicId())
                .build();
    }

    public List<BlogImageDTO> toBlogImageDTOs(List<BlogImage> blogImages) {
        return blogImages.stream().map(this::toBlogImageDTO).collect(Collectors.toList());
    }
}
