package com.clothstore.retail_cloth_store.service;

import com.clothstore.retail_cloth_store.dto.SaleDto;

import java.util.List;

public interface SaleService {

    SaleDto createSale(SaleDto dto);

    List<SaleDto> getAllSales();

    SaleDto getSaleById(Long id);

    SaleDto updateSale(Long id, SaleDto dto);

    void deleteSale(Long id);
}