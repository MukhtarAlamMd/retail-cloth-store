package com.clothstore.retail_cloth_store.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfitLossDto {

    private Double totalSalesRevenue;

    private Double totalPurchaseCost;

    private Double grossProfit;

    private Double profitPercentage;

}