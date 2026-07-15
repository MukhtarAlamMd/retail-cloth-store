package com.clothstore.retail_cloth_store.service;

import com.clothstore.retail_cloth_store.dto.StockMovementDto;
import com.clothstore.retail_cloth_store.entity.MovementType;

import java.time.LocalDateTime;
import java.util.List;

public interface StockMovementService {

    // ==========================================
    // Create Stock Movement
    // ==========================================

    StockMovementDto saveStockMovement(
            StockMovementDto stockMovementDto);

    // ==========================================
    // Get All Stock Movements
    // ==========================================

    List<StockMovementDto> getAllStockMovements();

    // ==========================================
    // Get By Id
    // ==========================================

    StockMovementDto getStockMovementById(Long id);

    // ==========================================
    // Product History
    // ==========================================

    List<StockMovementDto> getStockMovementsByProduct(
            Long productId);

    // ==========================================
    // Movement Type
    // ==========================================

    List<StockMovementDto> getStockMovementsByType(
            MovementType movementType);

    // ==========================================
    // Date Range
    // ==========================================

    List<StockMovementDto> getStockMovementsBetweenDates(
            LocalDateTime start,
            LocalDateTime end);

    // ==========================================
    // Product + Type
    // ==========================================

    List<StockMovementDto> getProductMovementsByType(
            Long productId,
            MovementType movementType);

    // ==========================================
    // Latest Records
    // ==========================================

    List<StockMovementDto> getLatestMovements();

    // ==========================================
    // Delete
    // ==========================================

    void deleteStockMovement(Long id);

}