package com.clothstore.retail_cloth_store.service.impl;

import com.clothstore.retail_cloth_store.dto.DashboardDto;
import com.clothstore.retail_cloth_store.repository.*;
import com.clothstore.retail_cloth_store.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final CustomerRepository customerRepository;
    private final SupplierRepository supplierRepository;
    private final PurchaseRepository purchaseRepository;
    private final SaleRepository saleRepository;
    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;

    @Override
    public DashboardDto getDashboard() {

        return DashboardDto.builder()
                .totalProducts(productRepository.count())
                .totalCategories(categoryRepository.count())
                .totalCustomers(customerRepository.count())
                .totalSuppliers(supplierRepository.count())
                .totalPurchases(purchaseRepository.count())
                .totalSales(saleRepository.count())
                .totalExpenses(expenseRepository.count())
                .totalUsers(userRepository.count())
                .build();
    }
}