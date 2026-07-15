package com.clothstore.retail_cloth_store.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "purchases")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Purchase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String supplierName;

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be greater than 0")
    @Column(nullable = false)
    private Integer quantityPurchased;

    @NotNull(message = "Purchase price is required")
    @Min(value = 1, message = "Purchase price must be greater than 0")
    @Column(nullable = false)
    private Double purchasePrice;

    @Column(nullable = false)
    private Double totalCost;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus paymentStatus;

   // @Column(nullable = false)
   // private String paymentStatus;

    @Column(nullable = false)
    private LocalDateTime purchaseDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplier_id", nullable = false)
    private Supplier supplier;

    @PrePersist
    public void prePersist() {

        if (purchaseDate == null) {
            purchaseDate = LocalDateTime.now();
        }

        if (quantityPurchased != null && purchasePrice != null) {
            totalCost = quantityPurchased * purchasePrice;
        }

        if (paymentStatus == null) {
            paymentStatus = PaymentStatus.PENDING;
        }
    }
}