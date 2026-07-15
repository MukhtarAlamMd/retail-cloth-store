package com.clothstore.retail_cloth_store.dto;

import com.clothstore.retail_cloth_store.dto.LowStockProductDto;
import com.clothstore.retail_cloth_store.dto.RecentSaleDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardDto {

    private Long totalProducts;
    private Long totalCategories;
    private Long totalCustomers;
    private Long totalSuppliers;
    private Long totalPurchases;
    private Long totalSales;
    private Long totalExpenses;
    private Long totalUsers;

    private List<RecentSaleDto> recentSales;

    private List<LowStockProductDto> lowStockProducts;

}