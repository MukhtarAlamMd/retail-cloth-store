package com.clothstore.retail_cloth_store.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardReportDto {

    private Long totalProducts;

    private Long totalCategories;

    private Long totalCustomers;

    private Long totalSuppliers;

    private Long totalPurchases;

    private Long totalSales;

    private Double totalRevenue;

    private Double totalExpense;

    private Long lowStockProducts;

}