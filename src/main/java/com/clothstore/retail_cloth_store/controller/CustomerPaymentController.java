package com.clothstore.retail_cloth_store.controller;

import com.clothstore.retail_cloth_store.dto.CustomerPaymentDto;
import com.clothstore.retail_cloth_store.service.CustomerPaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer-payments")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerPaymentController {

    private final CustomerPaymentService customerPaymentService;

    // ==========================
    // Create Customer Payment
    // ==========================

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public CustomerPaymentDto saveCustomerPayment(
            @Valid @RequestBody CustomerPaymentDto customerPaymentDto) {

        return customerPaymentService.saveCustomerPayment(customerPaymentDto);
    }

    // ==========================
    // Update Customer Payment
    // ==========================

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public CustomerPaymentDto updateCustomerPayment(
            @PathVariable Long id,
            @Valid @RequestBody CustomerPaymentDto customerPaymentDto) {

        return customerPaymentService.updateCustomerPayment(
                id,
                customerPaymentDto
        );
    }

    // ==========================
    // Get Payment By Id
    // ==========================

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public CustomerPaymentDto getCustomerPaymentById(
            @PathVariable Long id) {

        return customerPaymentService.getCustomerPaymentById(id);
    }

    // ==========================
    // Get All Payments
    // ==========================

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<CustomerPaymentDto> getAllCustomerPayments() {

        return customerPaymentService.getAllCustomerPayments();
    }

    // ==========================
    // Get Payments By Customer
    // ==========================

    @GetMapping("/customer/{customerId}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<CustomerPaymentDto> getPaymentsByCustomer(
            @PathVariable Long customerId) {

        return customerPaymentService.getPaymentsByCustomer(customerId);
    }

    // ==========================
    // Delete Customer Payment
    // ==========================

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteCustomerPayment(
            @PathVariable Long id) {

        customerPaymentService.deleteCustomerPayment(id);

        return "Customer Payment Deleted Successfully";
    }

}