package com.clothstore.retail_cloth_store.repository;

import com.clothstore.retail_cloth_store.entity.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {
    long count();

    List<Sale> findTop5ByOrderBySaleDateDesc();

    // Date Wise Report
    List<Sale> findBySaleDateBetween(
            LocalDateTime startDate,
            LocalDateTime endDate
    );



    @Query("""
            SELECT
            MONTH(s.saleDate),
            SUM(s.grandTotal)
            FROM Sale s
            WHERE YEAR(s.saleDate)=:year
            GROUP BY MONTH(s.saleDate)
            ORDER BY MONTH(s.saleDate)
            """)
    List<Object[]> getMonthlySales(@Param("year") Integer year);




    // Customer Wise Report
    List<Sale> findByCustomer_Id(Long customerId);

    // Product Wise Report
    @Query("""
           SELECT DISTINCT s
           FROM Sale s
           JOIN s.items i
           WHERE i.product.id = :productId
           """)
    List<Sale> findByProductId(Long productId);

    // Revenue
    @Query("""
           SELECT COALESCE(SUM(s.grandTotal),0)
           FROM Sale s
           """)
    Double getTotalRevenue();
}