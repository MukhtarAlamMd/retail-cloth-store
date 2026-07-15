package com.clothstore.retail_cloth_store.repository;

import com.clothstore.retail_cloth_store.entity.SupplierPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface SupplierPaymentRepository
        extends JpaRepository<SupplierPayment, Long> {

    // ==========================================
    // Supplier Payment History
    // ==========================================

    List<SupplierPayment> findBySupplierIdOrderByPaymentDateDesc(
            Long supplierId);

    // ==========================================
    // Payments Between Dates
    // ==========================================

    List<SupplierPayment> findByPaymentDateBetween(
            LocalDate startDate,
            LocalDate endDate);

    // ==========================================
    // Supplier Payments Between Dates
    // ==========================================

    List<SupplierPayment> findBySupplierIdAndPaymentDateBetween(
            Long supplierId,
            LocalDate startDate,
            LocalDate endDate);

    // ==========================================
    // Total Payment By Supplier
    // ==========================================

    @Query("""
            SELECT COALESCE(SUM(sp.amount),0)
            FROM SupplierPayment sp
            WHERE sp.supplier.id = :supplierId
            """)
    Double getTotalPaymentBySupplier(Long supplierId);

    // ==========================================
    // Total Payments
    // ==========================================

    @Query("""
            SELECT COALESCE(SUM(sp.amount),0)
            FROM SupplierPayment sp
            """)
    Double getTotalPayments();

    // ==========================================
    // Latest Payments
    // ==========================================

    List<SupplierPayment> findTop10ByOrderByPaymentDateDesc();

}