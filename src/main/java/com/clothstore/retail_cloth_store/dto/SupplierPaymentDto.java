package com.clothstore.retail_cloth_store.dto;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SupplierPaymentDto {

    private Long id;

    // ==============================
    // Supplier
    // ==============================

    @NotNull(message = "Supplier is required")
    private Long supplierId;

    private String supplierName;

    // ==============================
    // Payment Amount
    // ==============================

    @NotNull(message = "Amount is required")
    @Positive(message = "Amount must be greater than zero")
    private Double amount;

    // ==============================
    // Payment Date
    // ==============================

    @NotNull(message = "Payment date is required")
    private LocalDate paymentDate;

    // ==============================
    // Payment Method
    // ==============================

    @NotBlank(message = "Payment method is required")
    private String paymentMethod;

    // ==============================
    // Reference Number
    // ==============================

    private String referenceNumber;

    // ==============================
    // Remarks
    // ==============================

    private String remarks;

}