package com.swd.project.service;

import com.swd.project.dto.request.MembershipPackageRequest;
import com.swd.project.dto.response.MembershipPackageResponse;

import java.util.List;
import java.util.Optional;

public interface IMembershipPackage {
    MembershipPackageResponse createMembershipPackage(MembershipPackageRequest request);
    MembershipPackageResponse updateMembershipPackage(int id, MembershipPackageRequest request);
    void deleteMembershipPackage(int id);
    MembershipPackageResponse getMembershipPackageById(int id);
    List<MembershipPackageResponse> getAllMembershipPackages();
    void enableMembershipPackage(int id);
    void disableMembershipPackage(int id);

}
