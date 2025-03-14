package com.swd.project.service;

import com.swd.project.dto.response.BlogDTO;
import org.springframework.web.multipart.MultipartFile;

public interface IBlogService {

    BlogDTO createBlog(String title, String content, MultipartFile[] images);
}
