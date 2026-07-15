package com.clothstore.retail_cloth_store.service;

import com.clothstore.retail_cloth_store.dto.PurchaseDto;

import java.util.List;

public interface PurchaseService {

    PurchaseDto createPurchase(PurchaseDto dto);

    List<PurchaseDto> getAllPurchases();

    PurchaseDto getPurchaseById(Long id);
    PurchaseDto updatePurchase(Long id, PurchaseDto dto);

    void deletePurchase(Long id);
}