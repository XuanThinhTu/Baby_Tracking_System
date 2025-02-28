package com.swd.project.repository;

import com.swd.project.entity.GrowthTracker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GrowthTrackerRepository extends JpaRepository<GrowthTracker, Integer> {
    List<GrowthTracker> findAllByChildrenIdAndDeletedFalse(int childrenId);
}
