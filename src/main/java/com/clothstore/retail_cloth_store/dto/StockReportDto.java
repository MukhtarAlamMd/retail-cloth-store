package com.clothstore.retail_cloth_store.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StockReportDto {

    private Long productId;

    private String productName;

    private String category;

    private Integer stock;

    private Double buyingPrice;

    private Double sellingPrice;

    private Double stockValue;

    private Double expectedProfit;

    private String stockStatus;
}