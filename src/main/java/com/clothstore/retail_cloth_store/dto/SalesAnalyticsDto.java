package com.clothstore.retail_cloth_store.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SalesAnalyticsDto {

    private String month;
    private Double totalSales;

}