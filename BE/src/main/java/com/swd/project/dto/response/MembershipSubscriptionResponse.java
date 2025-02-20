package com.swd.project.dto.response;

import java.util.Date;

public record MembershipSubscriptionResponse(
        int id,
        int membershipId,
        String membershipName,
        String membershipDescription,
        double price,
        int duration,
        Date startDate,
        Date endDate,
        String status
) {
}
