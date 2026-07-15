package com.clothstore.retail_cloth_store.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InventoryDto {

    private Long productId;

    private String productName;

    private String categoryName;

    private String size;

    private String color;

    private Double price;

    private Integer stockQuantity;

    private String stockStatus;
}