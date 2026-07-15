package com.clothstore.retail_cloth_store.controller;

import com.clothstore.retail_cloth_store.dto.PayrollDto;
import com.clothstore.retail_cloth_store.service.PayrollService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payroll")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class PayrollController {

    private final PayrollService payrollService;

    // Create Payroll
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public PayrollDto createPayroll(
            @Valid @RequestBody PayrollDto payrollDto) {

        return payrollService.createPayroll(payrollDto);
    }

    // Get Payroll By Id
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public PayrollDto getPayrollById(
            @PathVariable Long id) {

        return payrollService.getPayrollById(id);
    }

    // Get All Payroll
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<PayrollDto> getAllPayrolls() {

        return payrollService.getAllPayrolls();
    }

    // Update Payroll
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public PayrollDto updatePayroll(
            @PathVariable Long id,
            @Valid @RequestBody PayrollDto payrollDto) {

        return payrollService.updatePayroll(id, payrollDto);
    }

    // Delete Payroll
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deletePayroll(
            @PathVariable Long id) {

        payrollService.deletePayroll(id);
    }

    // Payroll By Employee
    @GetMapping("/employee/{employeeId}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<PayrollDto> getPayrollByEmployee(
            @PathVariable Long employeeId) {

        return payrollService.getPayrollByEmployee(employeeId);
    }

    // Payroll By Payment Status
    @GetMapping("/status/{status}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<PayrollDto> getPayrollByPaymentStatus(
            @PathVariable String status) {

        return payrollService.getPayrollByPaymentStatus(status);
    }

    // Payroll By Month & Year
    @GetMapping("/month/{month}/year/{year}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<PayrollDto> getPayrollByMonthAndYear(
            @PathVariable String month,
            @PathVariable Integer year) {

        return payrollService.getPayrollByMonthAndYear(month, year);
    }

    // Mark Payroll As Paid
    @PutMapping("/{id}/paid")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public PayrollDto markAsPaid(
            @PathVariable Long id) {

        return payrollService.markAsPaid(id);
    }

    // Mark Payroll As Pending
    @PutMapping("/{id}/pending")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public PayrollDto markAsPending(
            @PathVariable Long id) {

        return payrollService.markAsPending(id);
    }

}