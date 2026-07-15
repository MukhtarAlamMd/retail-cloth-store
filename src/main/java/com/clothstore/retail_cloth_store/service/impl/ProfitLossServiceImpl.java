package com.clothstore.retail_cloth_store.service.impl;

import com.clothstore.retail_cloth_store.dto.ProfitLossDto;
import com.clothstore.retail_cloth_store.repository.PurchaseRepository;
import com.clothstore.retail_cloth_store.repository.SaleRepository;
import com.clothstore.retail_cloth_store.service.ProfitLossService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfitLossServiceImpl
        implements ProfitLossService {

    private final SaleRepository saleRepository;

    private final PurchaseRepository purchaseRepository;

    @Override
    public ProfitLossDto getProfitLoss() {

        Double salesRevenue = saleRepository.getTotalRevenue();

        Double purchaseCost = purchaseRepository.getTotalPurchaseCost();

        Double grossProfit = salesRevenue - purchaseCost;

        Double percentage = 0.0;

        if (purchaseCost > 0) {

            percentage =
                    (grossProfit / purchaseCost) * 100;
        }

        return ProfitLossDto.builder()

                .totalSalesRevenue(salesRevenue)

                .totalPurchaseCost(purchaseCost)

                .grossProfit(grossProfit)

                .profitPercentage(
                        Math.round(percentage * 100.0) / 100.0
                )

                .build();
    }
}