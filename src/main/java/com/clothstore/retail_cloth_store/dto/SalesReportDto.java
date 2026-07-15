package com.clothstore.retail_cloth_store.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SalesReportDto {

    private Long saleId;

    private String customerName;

    private String productName;

    private Integer quantity;

    private Double price;

    private Double totalAmount;

    private LocalDateTime saleDate;

}