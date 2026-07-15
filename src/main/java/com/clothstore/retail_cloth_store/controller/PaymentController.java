package com.clothstore.retail_cloth_store.controller;

import com.clothstore.retail_cloth_store.dto.PaymentDto;
import com.clothstore.retail_cloth_store.service.PaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    private final PaymentService paymentService;

    // ============================
    // Create Payment
    // ============================
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','CASHIER')")
    public PaymentDto createPayment(
            @Valid @RequestBody PaymentDto paymentDto) {

        return paymentService.createPayment(paymentDto);
    }

    // ============================
    // Get All Payments
    // ============================
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','CASHIER')")
    public List<PaymentDto> getAllPayments() {

        return paymentService.getAllPayments();
    }

    // ============================
    // Get Payment By Id
    // ============================
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','CASHIER')")
    public PaymentDto getPaymentById(
            @PathVariable Long id) {

        return paymentService.getPaymentById(id);
    }

    // ============================
    // Update Payment
    // ============================
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public PaymentDto updatePayment(
            @PathVariable Long id,
            @Valid @RequestBody PaymentDto paymentDto) {

        return paymentService.updatePayment(id, paymentDto);
    }

    // ============================
    // Delete Payment
    // ============================
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deletePayment(
            @PathVariable Long id) {

        paymentService.deletePayment(id);
    }
}