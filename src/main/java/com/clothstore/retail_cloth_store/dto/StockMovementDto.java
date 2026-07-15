package com.clothstore.retail_cloth_store.dto;

import com.clothstore.retail_cloth_store.entity.MovementType;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StockMovementDto {

    private Long id;

    // Product
    private Long productId;
    private String productName;

    // Movement
    private MovementType movementType;

    // Quantity
    private Integer quantity;

    // Stock Details
    private Integer stockBefore;
    private Integer stockAfter;

    // Remarks
    private String remarks;

    // Audit
    private LocalDateTime createdAt;

    private Long createdById;
    private String createdByName;

}