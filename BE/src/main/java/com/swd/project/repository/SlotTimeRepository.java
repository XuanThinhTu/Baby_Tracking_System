package com.swd.project.repository;

import com.swd.project.entity.SlotTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SlotTimeRepository extends JpaRepository<SlotTime, Integer> {
}
