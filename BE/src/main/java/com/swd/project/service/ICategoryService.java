package com.swd.project.service;

import com.swd.project.dto.request.CategoryCreationRequest;
import com.swd.project.dto.response.CategoryDTO;

import java.util.List;

public interface ICategoryService {

    CategoryDTO createCategory(CategoryCreationRequest request);

    CategoryDTO updateCategory(int id, CategoryCreationRequest updateRequest);

    List<CategoryDTO> getAllCategory();

    void deleteCategory(int id);
}
