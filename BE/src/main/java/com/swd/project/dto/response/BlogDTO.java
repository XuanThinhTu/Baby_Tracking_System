package com.swd.project.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BlogDTO {

    int id;
    String title;
    String content;
    Date createdAt;
    Date updatedAt;
    int authorId;
    String authorName;
    String authorImage;
    int categoryId;
    String categoryName;
    List<BlogImageDTO> blogImages;
}
