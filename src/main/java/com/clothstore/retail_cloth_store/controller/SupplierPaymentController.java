package com.clothstore.retail_cloth_store.controller;

import com.clothstore.retail_cloth_store.dto.SupplierPaymentDto;
import com.clothstore.retail_cloth_store.service.SupplierPaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/supplier-payments")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class SupplierPaymentController {

    private final SupplierPaymentService supplierPaymentService;

    // ==========================================
    // Create Payment
    // ==========================================

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public SupplierPaymentDto saveSupplierPayment(
            @Valid @RequestBody SupplierPaymentDto dto) {

        return supplierPaymentService.saveSupplierPayment(dto);
    }

    // ==========================================
    // Update Payment
    // ==========================================

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public SupplierPaymentDto updateSupplierPayment(
            @PathVariable Long id,
            @Valid @RequestBody SupplierPaymentDto dto) {

        return supplierPaymentService.updateSupplierPayment(id, dto);
    }

    // ==========================================
    // Delete Payment
    // ==========================================

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteSupplierPayment(
            @PathVariable Long id) {

        supplierPaymentService.deleteSupplierPayment(id);
    }

    // ==========================================
    // Get Payment By Id
    // ==========================================

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public SupplierPaymentDto getSupplierPaymentById(
            @PathVariable Long id) {

        return supplierPaymentService.getSupplierPaymentById(id);
    }

    // ==========================================
    // Get All Payments
    // ==========================================

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<SupplierPaymentDto> getAllSupplierPayments() {

        return supplierPaymentService.getAllSupplierPayments();
    }

    // ==========================================
    // Payment History By Supplier
    // ==========================================

    @GetMapping("/supplier/{supplierId}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<SupplierPaymentDto> getPaymentsBySupplier(
            @PathVariable Long supplierId) {

        return supplierPaymentService.getPaymentsBySupplier(supplierId);
    }

    // ==========================================
    // Payments Between Dates
    // ==========================================

    @GetMapping("/date")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<SupplierPaymentDto> getPaymentsBetweenDates(

            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate startDate,

            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate endDate) {

        return supplierPaymentService.getPaymentsBetweenDates(
                startDate,
                endDate);
    }

    // ==========================================
    // Supplier Payments Between Dates
    // ==========================================

    @GetMapping("/supplier/{supplierId}/date")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<SupplierPaymentDto> getSupplierPaymentsBetweenDates(

            @PathVariable Long supplierId,

            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate startDate,

            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate endDate) {

        return supplierPaymentService
                .getSupplierPaymentsBetweenDates(
                        supplierId,
                        startDate,
                        endDate);
    }

    // ==========================================
    // Total Payment By Supplier
    // ==========================================

    @GetMapping("/supplier/{supplierId}/total")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public Double getTotalPaymentBySupplier(
            @PathVariable Long supplierId) {

        return supplierPaymentService
                .getTotalPaymentBySupplier(supplierId);
    }

    // ==========================================
    // Total Payments
    // ==========================================

    @GetMapping("/total")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public Double getTotalPayments() {

        return supplierPaymentService.getTotalPayments();
    }

    // ==========================================
    // Latest Payments
    // ==========================================

    @GetMapping("/latest")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<SupplierPaymentDto> getLatestPayments() {

        return supplierPaymentService.getLatestPayments();
    }

}