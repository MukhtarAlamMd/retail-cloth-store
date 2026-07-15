package com.clothstore.retail_cloth_store.mapper;

import com.clothstore.retail_cloth_store.dto.SupplierDto;
import com.clothstore.retail_cloth_store.entity.Supplier;

public class SupplierMapper {

    public static Supplier toEntity(SupplierDto dto){

        Supplier supplier = new Supplier();

        supplier.setId(dto.getId());
        supplier.setSupplierName(dto.getSupplierName());
        supplier.setContactPerson(dto.getContactPerson());
        supplier.setEmail(dto.getEmail());
        supplier.setMobile(dto.getMobile());
        supplier.setGstNumber(dto.getGstNumber());
        supplier.setAddress(dto.getAddress());
        supplier.setCity(dto.getCity());
        supplier.setState(dto.getState());
        supplier.setPinCode(dto.getPinCode());

        return supplier;
    }

    public static SupplierDto toDto(Supplier supplier){

        SupplierDto dto = new SupplierDto();

        dto.setId(supplier.getId());
        dto.setSupplierName(supplier.getSupplierName());
        dto.setContactPerson(supplier.getContactPerson());
        dto.setPinCode(supplier.getPinCode());
        dto.setGstNumber(supplier.getGstNumber());
        dto.setEmail(supplier.getEmail());
        dto.setMobile(supplier.getMobile());
        dto.setGstNumber(supplier.getGstNumber());
        dto.setAddress(supplier.getAddress());
        dto.setCity(supplier.getCity());
        dto.setState(supplier.getState());

        return dto;
    }
}