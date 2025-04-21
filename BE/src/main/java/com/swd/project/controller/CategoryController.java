package com.swd.project.controller;

import com.swd.project.dto.request.CategoryCreationRequest;
import com.swd.project.dto.response.ApiResponse;
import com.swd.project.dto.response.CategoryDTO;
import com.swd.project.service.ICategoryService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/category")
public class CategoryController {

    private final ICategoryService categoryService;

    @PostMapping("/create")
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ApiResponse<CategoryDTO> createCategory(@RequestBody CategoryCreationRequest request) {
        return ApiResponse.<CategoryDTO>builder()
                .message("Successfully created category")
                .data(categoryService.createCategory(request))
                .build();
    }

    @PutMapping("/update/{id}")
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ApiResponse<CategoryDTO> update(@PathVariable int id,@RequestBody CategoryCreationRequest updateRequest) {
        return ApiResponse.<CategoryDTO>builder()
                .message("Successfully update category")
                .data(categoryService.updateCategory(id, updateRequest))
                .build();
    }

    @PutMapping("/delete/{id}")
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ApiResponse<?> delete(@PathVariable int id) {
        categoryService.deleteCategory(id);
        return ApiResponse.<CategoryDTO>builder()
                .message("Successfully deleted category")
                .build();
    }

    @GetMapping("/all")
    public ApiResponse<List<CategoryDTO>> getAllCategories() {
        return ApiResponse.<List<CategoryDTO>>builder()
                .message("Successfully retrieved all categories")
                .data(categoryService.getAllCategory())
                .build();
    }
}
