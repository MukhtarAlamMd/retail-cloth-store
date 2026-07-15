package com.clothstore.retail_cloth_store.controller;

import com.clothstore.retail_cloth_store.dto.SaleDto;
import com.clothstore.retail_cloth_store.service.SaleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sales")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class SaleController {

    private final SaleService saleService;
/*
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public SaleDto createSale(
            @Valid @RequestBody SaleDto dto) {

        return saleService.createSale(dto);
    }*/

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<SaleDto> getAllSales() {

        return saleService.getAllSales();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public SaleDto getSaleById(
            @PathVariable Long id) {

        return saleService.getSaleById(id);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public SaleDto createSale(@Valid @RequestBody SaleDto dto) {

        System.out.println("Controller reached");
        System.out.println(dto);

        return saleService.createSale(dto);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public SaleDto updateSale(
            @PathVariable Long id,
            @Valid @RequestBody SaleDto dto) {

        return saleService.updateSale(id, dto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public void deleteSale(
            @PathVariable Long id) {

        saleService.deleteSale(id);
    }
}