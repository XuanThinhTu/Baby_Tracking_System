package com.swd.project.service.impl;

import com.swd.project.dto.request.CategoryCreationRequest;
import com.swd.project.dto.response.CategoryDTO;
import com.swd.project.entity.Category;
import com.swd.project.mapper.CategoryMapper;
import com.swd.project.repository.CategoryRepository;
import com.swd.project.service.ICategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService implements ICategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Override
    public CategoryDTO createCategory(CategoryCreationRequest request) {
        Category category = new Category();
        category.setTitle(request.getTitle());
        category.setDescription(request.getDescription());
        categoryRepository.save(category);
        return categoryMapper.toCategoryDTO(category);
    }

    @Override
    public CategoryDTO updateCategory(int id, CategoryCreationRequest updateRequest) {
        Category category = categoryRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        category.setTitle(updateRequest.getTitle());
        category.setDescription(updateRequest.getDescription());
        categoryRepository.save(category);
        return categoryMapper.toCategoryDTO(category);
    }

    @Override
    public List<CategoryDTO> getAllCategory() {
        List<Category> categories = categoryRepository.findAllByIsDeletedFalse();
        return categories.stream().map(categoryMapper::toCategoryDTO).collect(Collectors.toList());
    }

    @Override
    public void deleteCategory(int id) {
        Category category = categoryRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        category.setDeleted(true);
        categoryRepository.save(category);
    }
}
