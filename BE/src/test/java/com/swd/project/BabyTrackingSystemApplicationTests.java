package com.swd.project;

import com.swd.project.entity.MembershipSubscription;
import com.swd.project.enums.MembershipSubscriptionStatus;
import com.swd.project.enums.PaymentStatus;
import com.swd.project.repository.MembershipSubscriptionRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Slf4j
class BabyTrackingSystemApplicationTests {

	@Autowired
	private MembershipSubscriptionRepository membershipSubscriptionRepository;

	@Test
	void contextLoads() {
		MembershipSubscription subscription = membershipSubscriptionRepository
				.findByUserIdAndPaymentStatusAndStatus(2, PaymentStatus.PENDING, MembershipSubscriptionStatus.UNAVAILABLE);
		log.info("Subscription: {}", subscription.getId());
	}

}
