package com.clothstore.retail_cloth_store.mapper;

import com.clothstore.retail_cloth_store.dto.PurchaseDto;
import com.clothstore.retail_cloth_store.entity.PaymentStatus;
import com.clothstore.retail_cloth_store.entity.Product;
import com.clothstore.retail_cloth_store.entity.Purchase;
import com.clothstore.retail_cloth_store.entity.Supplier;

public class PurchaseMapper {

    public static PurchaseDto mapToDto(Purchase purchase) {

        PurchaseDto dto = new PurchaseDto();

        dto.setId(purchase.getId());

        dto.setSupplierId(purchase.getSupplier().getId());
        dto.setSupplierName(purchase.getSupplier().getSupplierName());

        dto.setProductId(purchase.getProduct().getId());
        dto.setProductName(purchase.getProduct().getName());

        dto.setQuantityPurchased(purchase.getQuantityPurchased());
        dto.setPurchasePrice(purchase.getPurchasePrice());
        dto.setTotalCost(purchase.getTotalCost());

        // FIX
        dto.setPaymentStatus(
                purchase.getPaymentStatus().name()
        );

        dto.setPurchaseDate(purchase.getPurchaseDate());

        return dto;
    }

    public static Purchase mapToEntity(PurchaseDto dto) {

        Purchase purchase = new Purchase();

        purchase.setId(dto.getId());

        Product product = new Product();
        product.setId(dto.getProductId());
        purchase.setProduct(product);

        Supplier supplier = new Supplier();
        supplier.setId(dto.getSupplierId());
        purchase.setSupplier(supplier);

        purchase.setSupplierName(dto.getSupplierName());

        purchase.setQuantityPurchased(dto.getQuantityPurchased());
        purchase.setPurchasePrice(dto.getPurchasePrice());
        purchase.setTotalCost(dto.getTotalCost());
        purchase.setPurchaseDate(dto.getPurchaseDate());

        if (dto.getPaymentStatus() != null) {
            purchase.setPaymentStatus(
                    PaymentStatus.valueOf(dto.getPaymentStatus().toUpperCase())
            );
        } else {
            purchase.setPaymentStatus(PaymentStatus.PENDING);
        }

        return purchase;
    }
}