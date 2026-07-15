package com.clothstore.retail_cloth_store.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SaleItemDto {

    private Long id;

    @NotNull(message = "Product is required")
    private Long productId;

    private String productName;

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be greater than 0")
    private Integer quantity;

    @NotNull(message = "Selling price is required")
    @Min(value = 1, message = "Selling price must be greater than 0")
    private Double sellingPrice;

    private Double totalPrice;
}