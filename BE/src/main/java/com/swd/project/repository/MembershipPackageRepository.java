package com.swd.project.repository;

import com.swd.project.entity.MembershipPackage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MembershipPackageRepository extends JpaRepository<MembershipPackage, Integer> {
    // Lấy tất cả các gói chưa bị xóa
    List<MembershipPackage> findAllByIsDeletedFalse();

    // Lấy một gói theo id nếu chưa bị xóa
    Optional<MembershipPackage> findByIdAndIsDeletedFalse(Integer id);
}
