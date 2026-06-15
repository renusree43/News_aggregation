package com.sdc.project.service;

import com.sdc.project.dto.AuthRequest;
import com.sdc.project.dto.AuthResponse;
import com.sdc.project.dto.RegisterRequest;
import com.sdc.project.entity.User;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserService userService, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userService.existsByUsername(request.getUsername())) {
            throw new IllegalArgumentException("Username already exists");
        }
        if (userService.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }
        String requestedRole = String.valueOf(request.getRole()).toUpperCase();
        String role;
        if ("ROLE_ADMIN".equals(requestedRole)) {
            role = "ROLE_ADMIN";
        } else if ("ROLE_MANAGER".equals(requestedRole)) {
            role = "ROLE_MANAGER";
        } else {
            role = "ROLE_USER";
        }
        User user = new User(request.getUsername(), request.getPassword(), request.getEmail(), role);
        userService.saveUser(user);
        String token = jwtService.generateToken(user);
        return new AuthResponse(token, user.getUsername(), user.getRole());
    }

    public AuthResponse login(AuthRequest request) {
        String identifier = request.getLoginIdentifier();
        if (identifier == null || identifier.isBlank()) {
            throw new IllegalArgumentException("Username or email is required");
        }
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(identifier, request.getPassword()));
        } catch (AuthenticationException ex) {
            throw new IllegalArgumentException("Invalid username or password");
        }
        User user = (User) userService.loadUserByUsername(identifier);
        String token = jwtService.generateToken(user);
        return new AuthResponse(token, user.getUsername(), user.getRole());
    }
}
