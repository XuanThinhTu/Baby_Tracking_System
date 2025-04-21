package com.swd.project.repository;

import com.swd.project.entity.Children;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChildrenRepository extends JpaRepository<Children, Integer> {

    List<Children> findByUserId(int userId);
}
