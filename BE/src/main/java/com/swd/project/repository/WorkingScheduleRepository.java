package com.swd.project.repository;

import com.swd.project.entity.WorkingSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface WorkingScheduleRepository extends JpaRepository<WorkingSchedule, Integer> {
    List<WorkingSchedule> findByDate(LocalDate date);
    List<WorkingSchedule> findByDateBetween(LocalDate start, LocalDate end);
    List<WorkingSchedule> findByDateAndSlotTimeId(LocalDate date, int slotTimeId);
}
