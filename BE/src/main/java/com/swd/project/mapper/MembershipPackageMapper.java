package com.swd.project.mapper;

import com.swd.project.dto.request.MembershipPackageRequest;
import com.swd.project.dto.response.MembershipPackageResponse;
import com.swd.project.entity.MembershipPackage;
import org.springframework.stereotype.Component;


@Component
public class MembershipPackageMapper {

    // Chuyển từ entity sang DTO
    public MembershipPackageResponse toDto(MembershipPackage membershipPackage) {
        if (membershipPackage == null) {
            return null;
        }
        return new MembershipPackageResponse(
                membershipPackage.getId(),
                membershipPackage.getName(),
                membershipPackage.getDescription(),
                membershipPackage.getPrice(),
                membershipPackage.getDuration(),
                membershipPackage.isEnable()
        );
    }

    // Chuyển từ request sang entity (tạo mới)
    public MembershipPackage toMembershipPackage(MembershipPackageRequest request) {
        if (request == null) {
            return null;
        }
        MembershipPackage membershipPackage = new MembershipPackage();
        membershipPackage.setName(request.name());
        membershipPackage.setDescription(request.description());
        membershipPackage.setPrice(request.price());
        membershipPackage.setDuration(request.duration());
        return membershipPackage;
    }
}

