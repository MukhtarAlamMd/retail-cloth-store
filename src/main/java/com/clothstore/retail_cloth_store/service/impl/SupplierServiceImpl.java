package com.clothstore.retail_cloth_store.service.impl;

import com.clothstore.retail_cloth_store.dto.SupplierDto;
import com.clothstore.retail_cloth_store.entity.Supplier;
import com.clothstore.retail_cloth_store.exception.ResourceNotFoundException;
import com.clothstore.retail_cloth_store.exception.SupplierAlreadyExistsException;
import com.clothstore.retail_cloth_store.mapper.SupplierMapper;
import com.clothstore.retail_cloth_store.repository.SupplierRepository;
import com.clothstore.retail_cloth_store.service.SupplierService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SupplierServiceImpl
        implements SupplierService {

    private final SupplierRepository supplierRepository;

    @Override
    public List<SupplierDto> searchSuppliers(String keyword) {

        return supplierRepository
                .findBySupplierNameContainingIgnoreCase(keyword)
                .stream()
                .map(SupplierMapper::toDto)
                .toList();
    }

    @Override
    public SupplierDto createSupplier(SupplierDto dto) {

        if (supplierRepository.existsByEmail(dto.getEmail())) {
            throw new SupplierAlreadyExistsException(
                    "Supplier already exists."
            );
        }

        Supplier supplier =
                SupplierMapper.toEntity(dto);

        Supplier saved =
                supplierRepository.save(supplier);

        return SupplierMapper.toDto(saved);
    }

    @Override
    public SupplierDto updateSupplier(
            Long id,
            SupplierDto dto) {

        Supplier supplier =
                supplierRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Supplier not found"));

        supplier.setSupplierName(dto.getSupplierName());
        supplier.setEmail(dto.getEmail());
        supplier.setMobile(dto.getMobile());
        supplier.setGstNumber(dto.getGstNumber());
        supplier.setAddress(dto.getAddress());
        supplier.setCity(dto.getCity());
        supplier.setState(dto.getState());

        Supplier updated =
                supplierRepository.save(supplier);

        return SupplierMapper.toDto(updated);
    }

    @Override
    public SupplierDto getSupplierById(Long id) {

        Supplier supplier =
                supplierRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Supplier not found"));

        return SupplierMapper.toDto(supplier);
    }

    @Override
    public List<SupplierDto> getAllSuppliers() {

        return supplierRepository.findAll()
                .stream()
                .map(SupplierMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteSupplier(Long id) {

        Supplier supplier =
                supplierRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Supplier not found"));

        supplierRepository.delete(supplier);
    }
}