package com.clothstore.retail_cloth_store.service.impl;

import com.clothstore.retail_cloth_store.entity.Product;
import com.clothstore.retail_cloth_store.repository.ProductRepository;
import com.clothstore.retail_cloth_store.service.LowStockReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LowStockReportServiceImpl
        implements LowStockReportService {

    private final ProductRepository productRepository;

    @Override
    public List<Product> getLowStockProducts(Integer stockQuantity) {

        return productRepository
                .findByStockQuantityLessThanEqual(stockQuantity);
    }

    @Override
    public long getLowStockCount(Integer stockQuantity) {

        return productRepository
                .countByStockQuantityLessThanEqual(stockQuantity);
    }
}