package com.clothstore.retail_cloth_store.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SupplierReportDto {

    private Long supplierId;

    private String supplierName;

    private String mobile;

    private String email;

    private Long totalPurchases;

    private Integer totalQuantity;

    private Double totalAmount;
}