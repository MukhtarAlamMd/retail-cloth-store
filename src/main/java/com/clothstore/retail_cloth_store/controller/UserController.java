package com.clothstore.retail_cloth_store.controller;

import com.clothstore.retail_cloth_store.dto.RegisterRequest;
import com.clothstore.retail_cloth_store.dto.UpdateUserRequest;
import com.clothstore.retail_cloth_store.dto.UserDto;
import com.clothstore.retail_cloth_store.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;

    // ===========================
    // Get All Users
    // ===========================
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public ResponseEntity<List<UserDto>> getAllUsers() {

        return ResponseEntity.ok(
                userService.getAllUsers()
        );
    }

    // ===========================
    // Get User By Id
    // ===========================
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public ResponseEntity<UserDto> getUserById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                userService.getUserById(id)
        );
    }

    // ===========================
    // Create User
    // ===========================
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDto> createUser(
            @Valid @RequestBody RegisterRequest request) {

        UserDto savedUser = userService.createUser(request);

        return new ResponseEntity<>(
                savedUser,
                HttpStatus.CREATED
        );
    }

    // ===========================
    // Update User
    // ===========================
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDto> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UpdateUserRequest request) {

        UserDto updatedUser = userService.updateUser(id, request);

        return ResponseEntity.ok(updatedUser);
    }

    // ===========================
    // Delete User
    // ===========================
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteUser(
            @PathVariable Long id) {

        userService.deleteUser(id);

        return ResponseEntity.ok(
                "User deleted successfully."
        );
    }
}