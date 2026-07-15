package com.clothstore.retail_cloth_store.service.impl;

import com.clothstore.retail_cloth_store.dto.LoginRequest;
import com.clothstore.retail_cloth_store.dto.LoginResponse;
import com.clothstore.retail_cloth_store.dto.RegisterRequest;
import com.clothstore.retail_cloth_store.dto.RegisterResponse;
import com.clothstore.retail_cloth_store.entity.Role;
import com.clothstore.retail_cloth_store.entity.User;
import com.clothstore.retail_cloth_store.repository.UserRepository;
import com.clothstore.retail_cloth_store.security.JwtService;
import com.clothstore.retail_cloth_store.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    // ==========================================================
    // Register User
    // ==========================================================
    @Override
    public RegisterResponse register(RegisterRequest request) {

        // Check existing email
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // Create user
        User user = new User();

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());

        // Encrypt password
        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        // Set role
        user.setRole(
                Role.valueOf(request.getRole())
        );

        // Save user
        User savedUser = userRepository.save(user);

        // Return response
        return RegisterResponse.builder()
                .id(savedUser.getId())
                .firstName(savedUser.getFirstName())
                .lastName(savedUser.getLastName())
                .email(savedUser.getEmail())
                .role(savedUser.getRole().name())
                .message("Registration Successful")
                .build();
    }

    // ==========================================================
    // Login User
    // ==========================================================
    @Override
    public LoginResponse login(LoginRequest request) {

        // Authenticate email & password
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        // Load user
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                "Invalid email or password"
                        ));

        // Generate JWT
        String token = jwtService.generateToken(user);

        // Return response
        return LoginResponse.builder()
                .token(token)
                .name(user.getFirstName() + " " + user.getLastName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }
}