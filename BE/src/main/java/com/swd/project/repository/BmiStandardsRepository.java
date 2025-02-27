package com.swd.project.repository;

import com.swd.project.dto.response.StandardIndexResponse;
import com.swd.project.entity.BmiStandard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BmiStandardsRepository extends JpaRepository<BmiStandard, Long> {

}
