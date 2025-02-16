package com.swd.project.repository;

import com.swd.project.entity.MembershipSubscription;
import com.swd.project.enums.MembershipSubscriptionStatus;
import com.swd.project.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MembershipSubscriptionRepository extends JpaRepository<MembershipSubscription, Integer> {

    <Optional> MembershipSubscription findByUserIdAndPaymentStatusAndStatus(int userId, PaymentStatus paymentStatus, MembershipSubscriptionStatus status);
}
