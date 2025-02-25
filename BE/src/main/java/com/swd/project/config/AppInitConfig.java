package com.swd.project.config;

import com.swd.project.entity.Permission;
import com.swd.project.entity.Role;
import com.swd.project.entity.User;
import com.swd.project.enums.PermissionName;
import com.swd.project.repository.PermissionRepository;
import com.swd.project.repository.RoleRepository;
import com.swd.project.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@Slf4j
public class AppInitConfig {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    ApplicationRunner init() {
        return args -> {
            if(roleRepository.findAll().isEmpty()){
                Role roleAdmin = new Role();
                roleAdmin.setName("ROLE_ADMIN");
                roleRepository.save(roleAdmin);
                Role roleUser = new Role();
                roleUser.setName("ROLE_USER");
                roleRepository.save(roleUser);
                Role roleDoctor = new Role();
                roleDoctor.setName("ROLE_DOCTOR");
                roleRepository.save(roleDoctor);
                log.info("Roles initialized.");
            }
            if(permissionRepository.findAll().isEmpty()){
                Permission permissionGrowthTracker = new Permission();
                permissionGrowthTracker.setPermissionName(PermissionName.GROWTH_TRACKER.toString());
                permissionRepository.save(permissionGrowthTracker);
                Permission permissionConsultationRequest = new Permission();
                permissionConsultationRequest.setPermissionName(PermissionName.CONSULTATION_REQUEST.toString());
                permissionRepository.save(permissionConsultationRequest);
                Permission permissionBookingRequest = new Permission();
                permissionBookingRequest.setPermissionName(PermissionName.BOOKING_REQUEST.toString());
                permissionRepository.save(permissionBookingRequest);
                log.info("Permissions initialized.");
            }
            if (userRepository.findByEmail("babytrackingsys@gmail.com").isEmpty()) {
                User admin = new User();
                admin.setEmail("babytrackingsys@gmail.com");
                admin.setPassword(passwordEncoder.encode("123456")); // thay đổi mật khẩu theo nhu cầu
                admin.setFirstName("Admin");
                admin.setLastName("Admin");
                admin.setAddress("N/A");
                admin.setPhone("N/A");
                admin.setActive(true);

                Role adminRole = roleRepository.findByName("ROLE_ADMIN")
                        .orElseThrow(() -> new RuntimeException("Error: Role ROLE_ADMIN not exist"));
                admin.setRole(adminRole);

                userRepository.save(admin);
                log.info("Admin account initialized.");
            }
            if (userRepository.findByEmail("doctor@gmail.com").isEmpty()) {
                User doctor = new User();
                doctor.setEmail("doctor@gmail.com");
                doctor.setPassword(passwordEncoder.encode("123456")); // thay đổi mật khẩu theo nhu cầu
                doctor.setFirstName("System");
                doctor.setLastName("Doctor");
                doctor.setAddress("N/A");
                doctor.setPhone("N/A");
                doctor.setActive(true);

                Role adminRole = roleRepository.findByName("ROLE_DOCTOR")
                        .orElseThrow(() -> new RuntimeException("Error: Role ROLE_DOCTOR not exist"));
                doctor.setRole(adminRole);

                userRepository.save(doctor);
                log.info("System Doctor account initialized.");
            }
        };
    }
}
