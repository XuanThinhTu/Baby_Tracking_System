package com.swd.project.config;

import com.swd.project.entity.Role;
import com.swd.project.repository.RoleRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@Slf4j
public class AppInitConfig {

    @Autowired
    private RoleRepository roleRepository;

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
        };
    }
}
