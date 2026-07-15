package com.clothstore.retail_cloth_store.repository;

import com.clothstore.retail_cloth_store.entity.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {

    long count();

    @Query("""
            SELECT COALESCE(SUM(p.totalCost), 0)
            FROM Purchase p
            """)
    Double getTotalPurchaseCost();

    // Date Wise Purchase Report
    List<Purchase> findByPurchaseDateBetween(
            LocalDateTime start,
            LocalDateTime end
    );

    // Supplier Wise Purchase Report
    List<Purchase> findBySupplierId(Long supplierId);

    // Product Wise Purchase Report
    List<Purchase> findByProductId(Long productId);

    @Query("""
       SELECT COALESCE(SUM(p.totalCost),0)
       FROM Purchase p
       WHERE p.supplier.id = :supplierId
       """)
    Double getTotalPurchaseBySupplier(Long supplierId);

    @Query("""
            SELECT COUNT(p)
            FROM Purchase p
            WHERE p.supplier.id = :supplierId
            """)
    Long getTotalPurchases(@Param("supplierId") Long supplierId);

    @Query("""
            SELECT COALESCE(SUM(p.totalCost), 0)
            FROM Purchase p
            WHERE p.supplier.id = :supplierId
            """)
    Double getTotalPurchaseAmount(@Param("supplierId") Long supplierId);

    @Query("""
            SELECT COALESCE(SUM(p.quantityPurchased), 0)
            FROM Purchase p
            WHERE p.supplier.id = :supplierId
            """)
    Integer getTotalQuantity(@Param("supplierId") Long supplierId);
}