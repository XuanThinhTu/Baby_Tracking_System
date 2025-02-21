package com.swd.project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class BabyTrackingSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(BabyTrackingSystemApplication.class, args);
	}

}
