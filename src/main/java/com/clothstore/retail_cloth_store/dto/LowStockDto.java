package com.clothstore.retail_cloth_store.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LowStockDto {

    private Long productId;

    private String productName;

    private String category;

    private Integer quantity;

    private Integer minimumStock;

    private String status;
}