package com.swd.project.service.impl;

import com.swd.project.dto.response.BlogDTO;
import com.swd.project.entity.Blog;
import com.swd.project.entity.BlogImage;
import com.swd.project.entity.Category;
import com.swd.project.entity.User;
import com.swd.project.mapper.BlogMapper;
import com.swd.project.repository.BlogImageRepository;
import com.swd.project.repository.BlogRepository;
import com.swd.project.repository.CategoryRepository;
import com.swd.project.service.IBlogService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class BlogService implements IBlogService {

    private final BlogRepository blogRepository;
    private final BlogImageRepository blogImageRepository;
    private final UserService userService;
    private final CloudinaryService cloudinaryService;
    private final CategoryRepository categoryRepository;
    private final BlogMapper blogMapper;

    @Override
    public BlogDTO createBlog(String title, String content, int categoryId, MultipartFile[] images) throws IOException {
        User user = userService.getAuthenticatedUser();
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        Blog blog = new Blog();
        blog.setTitle(title);
        blog.setContent(content);
        blog.setCreatedAt(Date.valueOf(LocalDate.now()));
        blog.setUpdatedAt(Date.valueOf(LocalDate.now()));
        blog.setUser(user);
        blog.setCategory(category);
        List<BlogImage> blogImages = new ArrayList<>();

        if(images != null) {
            for (MultipartFile image : images) {
                Map map = cloudinaryService.upload(image);
                String url = (String) map.get("secure_url");
                String publicId = (String) map.get("public_id");

                BlogImage blogImage = new BlogImage();
                blogImage.setUrl(url);
                blogImage.setPublicId(publicId);
                blogImage.setBlog(blog);
                blogImages.add(blogImage);
            }
        }
        blog.setBlogImages(blogImages);
        blogRepository.save(blog);

        for(BlogImage blogImage : blogImages){
            blogImageRepository.save(blogImage);
        }

        return blogMapper.toBlogDTO(blog);
    }

    @Override
    public Page<BlogDTO> getAllBlogs(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Blog> blogs = blogRepository.findAll(pageable);
        return blogs.map((blogMapper::toBlogDTO));
    }

    @Override
    public void deleteBlog(int blogId) throws IOException {
        User currentUser = userService.getAuthenticatedUser();
        List<BlogImage> blogImages = blogImageRepository.findByBlogId(blogId);
        for(BlogImage blogImage : blogImages){
            log.info("Deleting image with public id {}", blogImage.getPublicId());
            cloudinaryService.delete(blogImage.getPublicId());
        }
        Blog blog = blogRepository.findById(blogId)
                .orElseThrow(() -> new RuntimeException("Blog not found"));
        if(blog.getUser().getId() != currentUser.getId()){
            log.warn("User {} is not allowed to delete blog {}", currentUser.getId(), blogId);
            throw new RuntimeException("You are not allowed to delete this blog");
        }
        blogRepository.delete(blog);
    }

    @Override
    public BlogDTO getBlogById(int blogId) {
        Blog blog = blogRepository.findById(blogId)
                .orElseThrow(() -> new RuntimeException("Blog not found"));
        return blogMapper.toBlogDTO(blog);
    }

    @Transactional
    @Override
    public BlogDTO updateBlog(int blogId, String title, String content, int categoryId, MultipartFile[] images) throws IOException {
        Blog blog = blogRepository.findById(blogId)
                .orElseThrow(() -> new RuntimeException("Blog not found"));
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        blog.setTitle(title);
        blog.setContent(content);
        blog.setUpdatedAt(Date.valueOf(LocalDate.now()));
        blog.setCategory(category);

        // Remove old images properly
        if (images != null && !blog.getBlogImages().isEmpty()) {
            for (BlogImage blogImage : new ArrayList<>(blog.getBlogImages())) {
                log.info("Deleting image with public id {}", blogImage.getPublicId());
                cloudinaryService.delete(blogImage.getPublicId()); // Delete from Cloudinary
            }
            blog.getBlogImages().clear(); // Remove old images properly
        }

        // Save blog first so it's managed
        blog = blogRepository.save(blog);

        // Add new images
        List<BlogImage> newBlogImages = new ArrayList<>();
        if (images != null) {
            for (MultipartFile image : images) {
                Map map = cloudinaryService.upload(image);
                String url = (String) map.get("secure_url");
                String publicId = (String) map.get("public_id");

                BlogImage blogImage = new BlogImage();
                blogImage.setUrl(url);
                blogImage.setPublicId(publicId);
                blogImage.setBlog(blog);
                newBlogImages.add(blogImage);
            }
        }

        // Add new images to blog safely
        blog.getBlogImages().addAll(newBlogImages);
        blogRepository.save(blog); // Save again to persist images

        return blogMapper.toBlogDTO(blog);
    }
}
