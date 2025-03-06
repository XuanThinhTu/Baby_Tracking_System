package com.swd.project.repository;

import com.swd.project.dto.response.StandardIndexResponse;
import com.swd.project.entity.BmiStandard;
import com.swd.project.enums.PeriodType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BmiStandardsRepository extends JpaRepository<BmiStandard, Long> {

    Optional<BmiStandard> findByGenderAndPeriodAndPeriodType(String gender, Integer period, PeriodType periodType);

    @Query(value = "CALL GetAllBmiStandards()", nativeQuery = true)
    List<Object[]> getAllBmiStandards();
}
