package com.clothstore.retail_cloth_store.service.impl;

import com.clothstore.retail_cloth_store.dto.StockMovementDto;
import com.clothstore.retail_cloth_store.entity.*;
import com.clothstore.retail_cloth_store.repository.ProductRepository;
import com.clothstore.retail_cloth_store.repository.StockMovementRepository;
import com.clothstore.retail_cloth_store.repository.UserRepository;
import com.clothstore.retail_cloth_store.service.StockMovementService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StockMovementServiceImpl
        implements StockMovementService {

    private final StockMovementRepository stockMovementRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Override
    public StockMovementDto saveStockMovement(
            StockMovementDto dto) {

        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() ->
                        new RuntimeException("Product not found"));

        User user = userRepository.findById(dto.getCreatedById())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        StockMovement movement = StockMovement.builder()
                .product(product)
                .movementType(dto.getMovementType())
                .quantity(dto.getQuantity())
                .stockBefore(dto.getStockBefore())
                .stockAfter(dto.getStockAfter())
                .remarks(dto.getRemarks())
                .createdBy(user)
                .createdAt(LocalDateTime.now())
                .build();

        return convertToDto(
                stockMovementRepository.save(movement));
    }

    @Override
    public List<StockMovementDto> getAllStockMovements() {

        return stockMovementRepository
                .findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::convertToDto)
                .toList();
    }

    @Override
    public StockMovementDto getStockMovementById(Long id) {

        return convertToDto(

                stockMovementRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Stock Movement not found"))
        );
    }

    @Override
    public List<StockMovementDto> getStockMovementsByProduct(Long productId) {

        return stockMovementRepository
                .findByProductIdOrderByCreatedAtDesc(productId)
                .stream()
                .map(this::convertToDto)
                .toList();
    }

    @Override
    public List<StockMovementDto> getStockMovementsByType(
            MovementType movementType) {

        return stockMovementRepository
                .findByMovementTypeOrderByCreatedAtDesc(movementType)
                .stream()
                .map(this::convertToDto)
                .toList();
    }

    @Override
    public List<StockMovementDto> getStockMovementsBetweenDates(
            LocalDateTime start,
            LocalDateTime end) {

        return stockMovementRepository
                .findByCreatedAtBetweenOrderByCreatedAtDesc(start, end)
                .stream()
                .map(this::convertToDto)
                .toList();
    }

    @Override
    public List<StockMovementDto> getProductMovementsByType(
            Long productId,
            MovementType movementType) {

        return stockMovementRepository
                .findByProductIdAndMovementTypeOrderByCreatedAtDesc(
                        productId,
                        movementType)
                .stream()
                .map(this::convertToDto)
                .toList();
    }

    @Override
    public List<StockMovementDto> getLatestMovements() {

        return stockMovementRepository
                .findTop10ByOrderByCreatedAtDesc()
                .stream()
                .map(this::convertToDto)
                .toList();
    }

    @Override
    public void deleteStockMovement(Long id) {

        stockMovementRepository.deleteById(id);
    }

    // =====================================================
    // Convert Entity → DTO
    // =====================================================

    private StockMovementDto convertToDto(
            StockMovement movement) {

        return StockMovementDto.builder()

                .id(movement.getId())

                .productId(movement.getProduct().getId())
                .productName(movement.getProduct().getName())

                .movementType(movement.getMovementType())

                .quantity(movement.getQuantity())

                .stockBefore(movement.getStockBefore())
                .stockAfter(movement.getStockAfter())

                .remarks(movement.getRemarks())

                .createdAt(movement.getCreatedAt())

                .createdById(movement.getCreatedBy().getId())
                .createdByName(movement.getCreatedBy().getUsername())

                .build();
    }
}