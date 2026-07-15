package com.clothstore.retail_cloth_store.dto;

import com.clothstore.retail_cloth_store.entity.PaymentStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PurchaseReportDto {

    private Long purchaseId;

    private String productName;

    private String supplierName;

    private Integer quantityPurchased;

    private Double purchasePrice;

    private Double totalCost;
    private PaymentStatus paymentStatus;

    private LocalDateTime purchaseDate;
}