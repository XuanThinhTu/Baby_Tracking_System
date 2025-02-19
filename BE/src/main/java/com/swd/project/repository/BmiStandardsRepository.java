package com.swd.project.repository;

import com.swd.project.dto.response.StandardIndexResponse;
import com.swd.project.entity.BmiStandard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BmiStandardsRepository extends JpaRepository<BmiStandard, Long> {

}
