package com.sdc.project.config;

import com.sdc.project.entity.User;
import com.sdc.project.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserService userService;

    public DataInitializer(UserService userService) {
        this.userService = userService;
    }

    @Override
    public void run(String... args) {
        if (!userService.existsByUsername("admin")) {
            User admin = new User("admin", "admin123", "admin@sdc.local", "ROLE_ADMIN");
            userService.saveUser(admin);
        } else {
            userService.ensureRole("admin", "ROLE_ADMIN");
        }
        if (!userService.existsByUsername("manager")) {
            User manager = new User("manager", "manager123", "manager@sdc.local", "ROLE_MANAGER");
            userService.saveUser(manager);
        }
        if (!userService.existsByUsername("user")) {
            User user = new User("user", "user123", "user@sdc.local", "ROLE_USER");
            userService.saveUser(user);
        } else {
            userService.ensureRole("user", "ROLE_USER");
        }
    }
}
