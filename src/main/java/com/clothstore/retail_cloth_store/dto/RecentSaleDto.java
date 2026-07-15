package com.clothstore.retail_cloth_store.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecentSaleDto {

    private Long id;

    private String customerName;

    private BigDecimal totalAmount;

    private LocalDate saleDate;

}