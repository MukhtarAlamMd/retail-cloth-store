package com.clothstore.retail_cloth_store.controller;

import com.clothstore.retail_cloth_store.dto.InventoryDto;
import com.clothstore.retail_cloth_store.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class InventoryController {

    private final InventoryService inventoryService;

    // ===========================================
    // Get All Inventory
    // ===========================================

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<InventoryDto> getAllInventory() {

        return inventoryService.getAllInventory();
    }

    // ===========================================
    // Get Low Stock Products
    // ===========================================

    @GetMapping("/low-stock")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<InventoryDto> getLowStockProducts() {

        return inventoryService.getLowStockProducts();
    }

    // ===========================================
    // Get Out Of Stock Products
    // ===========================================

    @GetMapping("/out-of-stock")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<InventoryDto> getOutOfStockProducts() {

        return inventoryService.getOutOfStockProducts();
    }

    // ===========================================
    // Get Inventory By Product Id
    // ===========================================

    @GetMapping("/{productId}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public InventoryDto getInventoryByProduct(
            @PathVariable Long productId) {

        return inventoryService.getInventoryByProduct(productId);
    }

}