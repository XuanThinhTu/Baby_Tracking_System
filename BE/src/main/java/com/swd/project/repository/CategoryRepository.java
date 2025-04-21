package com.swd.project.repository;

import com.swd.project.entity.Category;
import com.swd.project.entity.FAQ;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    Optional<Category> findByIdAndIsDeletedFalse(int id);

    List<Category> findAllByIsDeletedFalse();
}
