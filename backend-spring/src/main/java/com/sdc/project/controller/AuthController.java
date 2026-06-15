package com.sdc.project.controller;

import com.sdc.project.dto.AuthRequest;
import com.sdc.project.dto.AuthResponse;
import com.sdc.project.dto.RegisterRequest;
import com.sdc.project.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        // Only allow creating an admin or manager account when the caller is already authenticated as an admin.
        // If the request tries to set ROLE_ADMIN or ROLE_MANAGER but the caller is not an admin, force ROLE_USER.
        org.springframework.security.core.Authentication authentication = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
        if ("ROLE_ADMIN".equals(request.getRole()) || "ROLE_MANAGER".equals(request.getRole())) {
            boolean callerIsAdmin = false;
            if (authentication != null && authentication.isAuthenticated()) {
                callerIsAdmin = authentication.getAuthorities().stream()
                        .anyMatch(a -> "ROLE_ADMIN".equals(a.getAuthority()));
            }
            if (!callerIsAdmin) {
                request.setRole("ROLE_USER");
            }
        }
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}
