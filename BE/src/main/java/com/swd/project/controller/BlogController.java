package com.swd.project.controller;

import com.swd.project.dto.response.ApiResponse;
import com.swd.project.dto.response.BlogDTO;
import com.swd.project.service.IBlogService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/blogs")
@RequiredArgsConstructor
public class BlogController {

    private final IBlogService blogService;

    @PostMapping("/create")
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('ROLE_DOCTOR')")
    public ApiResponse<BlogDTO> createBlog(@RequestParam("title") String title,
                                           @RequestParam("content") String content,
                                           @RequestParam("categoryId") int categoryId,
                                           @RequestParam(name = "images", required = false) MultipartFile[] images) throws IOException {
        return ApiResponse.<BlogDTO>builder()
                .message("Blog created")
                .data(blogService.createBlog(title, content, categoryId, images))
                .build();
    }

    @GetMapping("/all")
    @SecurityRequirement(name = "bearerAuth")
    public ApiResponse<Page<BlogDTO>> getAllBlogs(@RequestParam(name = "page", defaultValue = "0") int page,
                                                  @RequestParam(name = "size", defaultValue = "10") int size) {
        return ApiResponse.<Page<BlogDTO>>builder()
                .message("All blogs")
                .data(blogService.getAllBlogs(page, size))
                .build();
    }
}
