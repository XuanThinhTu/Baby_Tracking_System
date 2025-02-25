package com.swd.project.repository;

import com.swd.project.entity.MembershipSubscription;
import com.swd.project.enums.MembershipSubscriptionStatus;
import com.swd.project.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MembershipSubscriptionRepository extends JpaRepository<MembershipSubscription, Integer> {

    <Optional> MembershipSubscription findByUserIdAndPaymentStatusAndStatus(int userId, PaymentStatus paymentStatus, MembershipSubscriptionStatus status);

    Optional<MembershipSubscription> findByUserIdAndStatus(int userId, MembershipSubscriptionStatus status);

    List<MembershipSubscription> findAllByStatus(MembershipSubscriptionStatus status);
}
