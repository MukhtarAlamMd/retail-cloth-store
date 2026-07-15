package com.clothstore.retail_cloth_store.controller;

import com.clothstore.retail_cloth_store.dto.ProductDTO;
import com.clothstore.retail_cloth_store.dto.ReportDto;
import com.clothstore.retail_cloth_store.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ReportController {

    private final ReportService reportService;

    // Dashboard

    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('ADMIN')")
    public ReportDto getDashboardReport() {
        return reportService.getDashboardReport();
    }

    // Sales

    @GetMapping("/sales")
    @PreAuthorize("hasRole('ADMIN')")
    public List<ReportDto> getSalesReport() {
        return reportService.getSalesReport();
    }

    @GetMapping("/sales/customer/{customerId}")
    @PreAuthorize("hasRole('ADMIN')")
    public List<ReportDto> getSalesByCustomer(
            @PathVariable Long customerId) {
        return reportService.getSalesByCustomer(customerId);
    }

    // Purchase

    @GetMapping("/purchases/all")
    @PreAuthorize("hasRole('ADMIN')")
    public List<ReportDto> getPurchaseReport() {
        return reportService.getPurchaseReport();
    }

    @GetMapping("/purchases/supplier/{supplierId}")
    @PreAuthorize("hasRole('ADMIN')")
    public List<ReportDto> getPurchaseBySupplier(
            @PathVariable Long supplierId) {
        return reportService.getPurchaseBySupplier(supplierId);
    }

    // Inventory

    @GetMapping("/inventory")
    @PreAuthorize("hasRole('ADMIN')")
    public List<ProductDTO> getInventoryReport() {
        return reportService.getInventoryReport();
    }

    @GetMapping("/inventory/low-stock")
    @PreAuthorize("hasRole('ADMIN')")
    public List<ReportDto> getLowStockReport() {
        return reportService.getLowStockReport();
    }

    // Customers

    @GetMapping("/customers")
    @PreAuthorize("hasRole('ADMIN')")
    public List<ReportDto> getCustomerReport() {
        return reportService.getCustomerReport();
    }

    // Suppliers

    @GetMapping("/suppliers")
    @PreAuthorize("hasRole('ADMIN')")
    public List<ReportDto> getSupplierReport() {
        return reportService.getSupplierReport();
    }

    // Employees

    @GetMapping("/employees")
    @PreAuthorize("hasRole('ADMIN')")
    public List<ReportDto> getEmployeeReport() {
        return reportService.getEmployeeReport();
    }

    // Attendance

    @GetMapping("/attendance")
    @PreAuthorize("hasRole('ADMIN')")
    public List<ReportDto> getAttendanceReport() {
        return reportService.getAttendanceReport();
    }

    // Payroll

    @GetMapping("/payroll")
    @PreAuthorize("hasRole('ADMIN')")
    public List<ReportDto> getPayrollReport() {
        return reportService.getPayrollReport();
    }

    // Leave

    @GetMapping("/leave")
    @PreAuthorize("hasRole('ADMIN')")
    public List<ReportDto> getLeaveReport() {
        return reportService.getLeaveReport();
    }

    // Expenses

    @GetMapping("/expenses")
    @PreAuthorize("hasRole('ADMIN')")
    public List<ReportDto> getExpenseReport() {
        return reportService.getExpenseReport();
    }

    // Profit & Loss

    @GetMapping("/profit-loss")
    @PreAuthorize("hasRole('ADMIN')")
    public ReportDto getProfitLossReport() {
        return reportService.getProfitLossReport();
    }
}