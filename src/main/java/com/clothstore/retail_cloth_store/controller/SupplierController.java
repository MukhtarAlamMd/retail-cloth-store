package com.clothstore.retail_cloth_store.controller;

import com.clothstore.retail_cloth_store.dto.SupplierDto;
import com.clothstore.retail_cloth_store.service.SupplierService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/suppliers")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class SupplierController {

    private final SupplierService supplierService;

    @GetMapping("/search")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<SupplierDto> searchSuppliers(@RequestParam String keyword) {
        return supplierService.searchSuppliers(keyword);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public SupplierDto createSupplier(
            @Valid @RequestBody SupplierDto dto) {

        return supplierService.createSupplier(dto);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<SupplierDto> getAllSuppliers() {

        return supplierService.getAllSuppliers();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public SupplierDto getSupplier(
            @PathVariable Long id) {

        return supplierService.getSupplierById(id);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public SupplierDto updateSupplier(
            @PathVariable Long id,
            @Valid @RequestBody SupplierDto dto) {

        return supplierService.updateSupplier(id, dto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteSupplier(
            @PathVariable Long id) {

        supplierService.deleteSupplier(id);

        return "Supplier deleted successfully";
    }
}