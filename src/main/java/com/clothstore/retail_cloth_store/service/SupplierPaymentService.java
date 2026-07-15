package com.clothstore.retail_cloth_store.service;

import com.clothstore.retail_cloth_store.dto.SupplierPaymentDto;

import java.time.LocalDate;
import java.util.List;

public interface SupplierPaymentService {

    // ==========================================
    // CRUD Operations
    // ==========================================

    SupplierPaymentDto saveSupplierPayment(
            SupplierPaymentDto dto);

    SupplierPaymentDto updateSupplierPayment(
            Long id,
            SupplierPaymentDto dto);

    void deleteSupplierPayment(Long id);

    SupplierPaymentDto getSupplierPaymentById(
            Long id);

    List<SupplierPaymentDto> getAllSupplierPayments();

    // ==========================================
    // Reports
    // ==========================================

    List<SupplierPaymentDto> getPaymentsBySupplier(
            Long supplierId);

    List<SupplierPaymentDto> getPaymentsBetweenDates(
            LocalDate startDate,
            LocalDate endDate);

    List<SupplierPaymentDto> getSupplierPaymentsBetweenDates(
            Long supplierId,
            LocalDate startDate,
            LocalDate endDate);

    // ==========================================
    // Dashboard
    // ==========================================

    Double getTotalPaymentBySupplier(
            Long supplierId);

    Double getTotalPayments();

    List<SupplierPaymentDto> getLatestPayments();

}