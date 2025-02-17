package com.swd.project.repository;

import com.swd.project.entity.GrowthTracker;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GrowthTrackerRepository extends JpaRepository<GrowthTracker, Integer> {
    List<GrowthTracker> findAllByChildrenIdAndDeletedFalse(int childrenId);
}
