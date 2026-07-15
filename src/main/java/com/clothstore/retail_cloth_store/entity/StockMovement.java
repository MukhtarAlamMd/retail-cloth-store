package com.clothstore.retail_cloth_store.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "stock_movements")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StockMovement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // =====================================
    // Product
    // =====================================

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    // =====================================
    // Movement Type
    // =====================================

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MovementType movementType;

    // =====================================
    // Quantity
    // =====================================

    @Column(nullable = false)
    private Integer quantity;

    // =====================================
    // Stock Before
    // =====================================

    @Column(nullable = false)
    private Integer stockBefore;

    // =====================================
    // Stock After
    // =====================================

    @Column(nullable = false)
    private Integer stockAfter;

    // =====================================
    // Remarks
    // =====================================

    @Column(length = 300)
    private String remarks;

    // =====================================
    // Created Date
    // =====================================

    @Column(nullable = false)
    private LocalDateTime createdAt;

    // =====================================
    // Created By
    // =====================================

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createdBy;

    // =====================================
    // Auto Timestamp
    // =====================================

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }
}