package com.swd.project.mapper;

import com.swd.project.dto.response.MembershipSubscriptionResponse;
import com.swd.project.entity.MembershipSubscription;
import org.springframework.stereotype.Component;

@Component
public class MembershipSubscriptionMapper {

    public MembershipSubscriptionResponse toMembershipSubscriptionResponse(MembershipSubscription membershipSubscription) {
        return new MembershipSubscriptionResponse(
                membershipSubscription.getId(),
                membershipSubscription.getMembershipPackage().getName(),
                membershipSubscription.getMembershipPackage().getDescription(),
                membershipSubscription.getMembershipPackage().getPrice(),
                membershipSubscription.getMembershipPackage().getDuration(),
                membershipSubscription.getStartDate(),
                membershipSubscription.getEndDate(),
                membershipSubscription.getStatus().name()
        );
    }
}
