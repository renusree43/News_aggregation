package com.sdc.project.controller;

import com.sdc.project.dto.UserDto;
import com.sdc.project.entity.User;
import com.sdc.project.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> getCurrentUser(Authentication authentication) {
        String username = authentication.getName();
        User user = (User) userService.loadUserByUsername(username);
        return ResponseEntity.ok(new UserDto(user.getId(), user.getUsername(), user.getEmail(), user.getRole()));
    }
}
