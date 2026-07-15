package com.clothstore.retail_cloth_store.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PurchaseDto {

    private Long id;

    @NotNull(message = "Supplier is required")
    private Long supplierId;

    private String supplierName;

    @NotNull(message = "Product is required")
    private Long productId;

    private String productName;

    @NotNull(message = "Quantity is required")
    @Min(1)
    private Integer quantityPurchased;

    @NotNull(message = "Purchase price is required")
    @Min(1)
    private Double purchasePrice;

    private Double totalCost;

    private String paymentStatus;

    private LocalDateTime purchaseDate;


}