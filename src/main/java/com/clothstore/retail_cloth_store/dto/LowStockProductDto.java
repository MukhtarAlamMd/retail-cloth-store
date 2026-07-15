package com.clothstore.retail_cloth_store.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LowStockProductDto {

    private Long id;

    private String productName;

    private Integer stockQuantity;

}