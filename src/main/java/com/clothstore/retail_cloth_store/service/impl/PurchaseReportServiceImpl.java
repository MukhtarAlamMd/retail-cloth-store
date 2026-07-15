package com.clothstore.retail_cloth_store.service.impl;

import com.clothstore.retail_cloth_store.dto.PurchaseReportDto;
import com.clothstore.retail_cloth_store.entity.Purchase;
import com.clothstore.retail_cloth_store.repository.PurchaseRepository;
import com.clothstore.retail_cloth_store.service.PurchaseReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PurchaseReportServiceImpl
        implements PurchaseReportService {

    private final PurchaseRepository purchaseRepository;

    @Override
    public List<PurchaseReportDto> getPurchaseReport(
            LocalDate start,
            LocalDate end) {

        LocalDateTime startDate =
                start.atStartOfDay();

        LocalDateTime endDate =
                end.atTime(23,59,59);

        List<Purchase> purchases =
                purchaseRepository.findByPurchaseDateBetween(
                        startDate,
                        endDate
                );

        return purchases.stream()
                .map(this::convertToDto)
                .toList();
    }

    private PurchaseReportDto convertToDto(
            Purchase purchase) {

        return PurchaseReportDto.builder()

                .purchaseId(
                        purchase.getId()
                )

                .productName(
                        purchase.getProduct()
                                .getName()
                )

                .supplierName(
                        purchase.getSupplierName()
                )

                .quantityPurchased(
                        purchase.getQuantityPurchased()
                )

                .purchasePrice(
                        purchase.getPurchasePrice()
                )

                .totalCost(
                        purchase.getTotalCost()
                )

                .purchaseDate(
                        purchase.getPurchaseDate()
                )
                .paymentStatus(
                        purchase.getPaymentStatus()
                )


                .build();
    }
}