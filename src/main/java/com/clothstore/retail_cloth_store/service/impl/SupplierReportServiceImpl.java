package com.clothstore.retail_cloth_store.service.impl;

import com.clothstore.retail_cloth_store.dto.SupplierReportDto;
import com.clothstore.retail_cloth_store.entity.Supplier;
import com.clothstore.retail_cloth_store.repository.PurchaseRepository;
import com.clothstore.retail_cloth_store.repository.SupplierRepository;
import com.clothstore.retail_cloth_store.service.SupplierReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SupplierReportServiceImpl
        implements SupplierReportService {

    private final SupplierRepository supplierRepository;
    private final PurchaseRepository purchaseRepository;

    @Override
    public List<SupplierReportDto> getSupplierReport() {

        List<Supplier> suppliers = supplierRepository.findAll();

        return suppliers.stream()
                .map(this::convertToDto)
                .toList();
    }

    private SupplierReportDto convertToDto(Supplier supplier) {

        return SupplierReportDto.builder()

                .supplierId(
                        supplier.getId()
                )

                .supplierName(
                        supplier.getSupplierName()
                )

                .mobile(
                        supplier.getMobile()
                )

                .email(
                        supplier.getEmail()
                )

                .totalPurchases(
                        purchaseRepository.getTotalPurchases(
                                supplier.getId()
                        )
                )

                .totalQuantity(
                        purchaseRepository.getTotalQuantity(
                                supplier.getId()
                        )
                )

                .totalAmount(
                        purchaseRepository.getTotalPurchaseAmount(
                                supplier.getId()
                        )
                )

                .build();
    }
}