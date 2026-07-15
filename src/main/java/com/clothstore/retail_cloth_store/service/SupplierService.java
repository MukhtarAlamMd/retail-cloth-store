package com.clothstore.retail_cloth_store.service;

import com.clothstore.retail_cloth_store.dto.SupplierDto;

import java.util.List;

public interface SupplierService {

    SupplierDto createSupplier(SupplierDto dto);

    SupplierDto updateSupplier(Long id, SupplierDto dto);

    SupplierDto getSupplierById(Long id);

    List<SupplierDto> getAllSuppliers();

    void deleteSupplier(Long id);
    List<SupplierDto> searchSuppliers(String keyword);
}