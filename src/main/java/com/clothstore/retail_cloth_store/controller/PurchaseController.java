package com.clothstore.retail_cloth_store.controller;
import com.clothstore.retail_cloth_store.dto.PurchaseDto;
import com.clothstore.retail_cloth_store.service.PurchaseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/purchases")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class PurchaseController {

    private final PurchaseService purchaseService;

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public PurchaseDto updatePurchase(
            @PathVariable Long id,
            @Valid @RequestBody PurchaseDto dto) {

        return purchaseService.updatePurchase(id, dto);
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public void deletePurchase(@PathVariable Long id) {

        purchaseService.deletePurchase(id);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public PurchaseDto createPurchase(
            @Valid @RequestBody PurchaseDto dto) {

        return purchaseService.createPurchase(dto);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<PurchaseDto> getAllPurchases() {

        return purchaseService.getAllPurchases();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public PurchaseDto getPurchaseById(
            @PathVariable Long id) {

        return purchaseService.getPurchaseById(id);
    }
}