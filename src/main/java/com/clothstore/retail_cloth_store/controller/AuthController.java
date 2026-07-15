package com.clothstore.retail_cloth_store.controller;

import com.clothstore.retail_cloth_store.dto.LoginRequest;
import com.clothstore.retail_cloth_store.dto.LoginResponse;
import com.clothstore.retail_cloth_store.dto.RegisterRequest;
import com.clothstore.retail_cloth_store.dto.RegisterResponse;
import com.clothstore.retail_cloth_store.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthService authService;

    // ============================================
    // Register User
    // ============================================
    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(
            @Valid @RequestBody RegisterRequest request) {

        RegisterResponse response = authService.register(request);

        return new ResponseEntity<>(
                response,
                HttpStatus.CREATED
        );
    }

    // ============================================
    // Login User
    // ============================================
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request) {

        LoginResponse response = authService.login(request);

        return ResponseEntity.ok(response);
    }
}