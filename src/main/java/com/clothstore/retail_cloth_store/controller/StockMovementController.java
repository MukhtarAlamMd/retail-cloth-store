package com.clothstore.retail_cloth_store.controller;

import com.clothstore.retail_cloth_store.dto.StockMovementDto;
import com.clothstore.retail_cloth_store.entity.MovementType;
import com.clothstore.retail_cloth_store.service.StockMovementService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/stock-movements")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class StockMovementController {

    private final StockMovementService stockMovementService;

    // ==========================================
    // Create Stock Movement
    // ==========================================

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public StockMovementDto saveStockMovement(
            @RequestBody StockMovementDto dto) {

        return stockMovementService.saveStockMovement(dto);
    }

    // ==========================================
    // Get All Stock Movements
    // ==========================================

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<StockMovementDto> getAllStockMovements() {

        return stockMovementService.getAllStockMovements();
    }

    // ==========================================
    // Get By Id
    // ==========================================

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public StockMovementDto getById(
            @PathVariable Long id) {

        return stockMovementService.getStockMovementById(id);
    }

    // ==========================================
    // Product History
    // ==========================================

    @GetMapping("/product/{productId}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<StockMovementDto> getByProduct(

            @PathVariable Long productId) {

        return stockMovementService
                .getStockMovementsByProduct(productId);
    }

    // ==========================================
    // Movement Type
    // ==========================================

    @GetMapping("/type/{movementType}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<StockMovementDto> getByType(

            @PathVariable MovementType movementType) {

        return stockMovementService
                .getStockMovementsByType(movementType);
    }

    // ==========================================
    // Product + Type
    // ==========================================

    @GetMapping("/product/{productId}/type/{movementType}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<StockMovementDto> getProductType(

            @PathVariable Long productId,

            @PathVariable MovementType movementType) {

        return stockMovementService
                .getProductMovementsByType(
                        productId,
                        movementType);
    }

    // ==========================================
    // Between Dates
    // ==========================================

    @GetMapping("/date-range")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<StockMovementDto> getBetweenDates(

            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
            LocalDateTime start,

            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
            LocalDateTime end) {

        return stockMovementService
                .getStockMovementsBetweenDates(
                        start,
                        end);
    }

    // ==========================================
    // Latest Stock Movements
    // ==========================================

    @GetMapping("/latest")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<StockMovementDto> latest() {

        return stockMovementService
                .getLatestMovements();
    }

    // ==========================================
    // Delete
    // ==========================================

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(

            @PathVariable Long id) {

        stockMovementService.deleteStockMovement(id);
    }

}