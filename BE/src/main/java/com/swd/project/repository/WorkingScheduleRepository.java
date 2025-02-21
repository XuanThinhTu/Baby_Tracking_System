package com.swd.project.repository;

import com.swd.project.entity.WorkingSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkingScheduleRepository extends JpaRepository<WorkingSchedule, Integer> {
}
