package com.clothstore.retail_cloth_store.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "supplier_payments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SupplierPayment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ==========================================
    // Supplier
    // ==========================================

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplier_id", nullable = false)
    private Supplier supplier;

    // ==========================================
    // Payment Amount
    // ==========================================

    @Column(nullable = false)
    private Double amount;

    // ==========================================
    // Payment Date
    // ==========================================

    @Column(nullable = false)
    private LocalDate paymentDate;

    // ==========================================
    // Payment Method
    // ==========================================

    @Column(length = 50)
    private String paymentMethod;

    // ==========================================
    // Reference Number
    // ==========================================

    @Column(length = 100)
    private String referenceNumber;

    // ==========================================
    // Remarks
    // ==========================================

    @Column(length = 500)
    private String remarks;

}