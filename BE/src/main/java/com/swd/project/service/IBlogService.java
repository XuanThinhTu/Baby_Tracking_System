package com.swd.project.service;

import com.swd.project.dto.response.BlogDTO;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface IBlogService {

    BlogDTO createBlog(String title, String content, int categoryId, MultipartFile[] images) throws IOException;

    Page<BlogDTO> getAllBlogs(int page, int size);

    void deleteBlog(int blogId) throws IOException;

    BlogDTO getBlogById(int blogId);

    BlogDTO updateBlog(int blogId, String title, String content, int categoryId, MultipartFile[] images) throws IOException;
}
