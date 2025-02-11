package com.swd.project.service.Impl;

import com.swd.project.dto.request.MembershipPackageRequest;
import com.swd.project.dto.response.MembershipPackageResponse;
import com.swd.project.entity.MembershipPackage;
import com.swd.project.exception.ResourceNotFoundException;
import com.swd.project.mapper.MembershipPackageMapper;
import com.swd.project.repository.MembershipPackageRepository;
import com.swd.project.service.IMembershipPackage;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class MembershipPackageService implements IMembershipPackage {
    private final MembershipPackageRepository packageRepository;
    private final MembershipPackageMapper packageMapper;

    @Override
    public MembershipPackageResponse createMembershipPackage(MembershipPackageRequest request) {
        MembershipPackage membershipPackage = packageMapper.toMembershipPackage(request);
        membershipPackage = packageRepository.save(membershipPackage);
        return packageMapper.toDto(membershipPackage);
    }

    @Override
    public MembershipPackageResponse updateMembershipPackage(int id,MembershipPackageRequest request) {
        MembershipPackage membershipPackage = packageRepository.findByIdAndIsDeletedFalse(id).orElseThrow(() -> new ResourceNotFoundException("Package with id " + id + " not found"));
        membershipPackage.setName(request.name());
        membershipPackage.setDescription(request.description());
        membershipPackage.setPrice(request.price());
        membershipPackage.setDuration(request.duration());
        membershipPackage = packageRepository.save(membershipPackage);
        return packageMapper.toDto(membershipPackage);
    }

    @Override
    public void deleteMembershipPackage(int id) {
        MembershipPackage membershipPackage = packageRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new RuntimeException("Membership Package id: " + id + " not found"));
        membershipPackage.setDeleted(true);
        packageRepository.save(membershipPackage);
    }

    @Override
    public MembershipPackageResponse getMembershipPackageById(int id) {
        MembershipPackage membershipPackage = packageRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new RuntimeException("Membership Package id: " + id + " not found"));
        return packageMapper.toDto(membershipPackage);
    }

    @Override
    public List<MembershipPackageResponse> getAllMembershipPackages() {
        return packageRepository.findAllByIsDeletedFalse()
                .stream()
                .map(packageMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public void enableMembershipPackage(int id) {
        MembershipPackage membershipPackage = packageRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new RuntimeException("Membership Package id: " + id + " not found"));
        membershipPackage.setEnable(true);
        packageRepository.save(membershipPackage);
    }

    @Override
    public void disableMembershipPackage(int id) {
        MembershipPackage membershipPackage = packageRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new RuntimeException("Membership Package id: " + id + " not found"));
        membershipPackage.setEnable(false);
        packageRepository.save(membershipPackage);
    }
}
