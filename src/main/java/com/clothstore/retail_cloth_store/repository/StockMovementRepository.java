package com.clothstore.retail_cloth_store.repository;

import com.clothstore.retail_cloth_store.entity.MovementType;
import com.clothstore.retail_cloth_store.entity.StockMovement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface StockMovementRepository
        extends JpaRepository<StockMovement, Long> {

    // ==========================================
    // All movements (Latest First)
    // ==========================================

    List<StockMovement> findAllByOrderByCreatedAtDesc();

    // ==========================================
    // By Product
    // ==========================================

    List<StockMovement> findByProductIdOrderByCreatedAtDesc(Long productId);

    // ==========================================
    // By Movement Type
    // ==========================================

    List<StockMovement> findByMovementTypeOrderByCreatedAtDesc(
            MovementType movementType);

    // ==========================================
    // Between Dates
    // ==========================================

    List<StockMovement> findByCreatedAtBetweenOrderByCreatedAtDesc(
            LocalDateTime start,
            LocalDateTime end);

    // ==========================================
    // Product + Type
    // ==========================================

    List<StockMovement> findByProductIdAndMovementTypeOrderByCreatedAtDesc(
            Long productId,
            MovementType movementType);

    // ==========================================
    // Latest 10 Records
    // ==========================================

    List<StockMovement> findTop10ByOrderByCreatedAtDesc();

}