package com.clothstore.retail_cloth_store.service;

import com.clothstore.retail_cloth_store.entity.Product;

import java.util.List;

public interface LowStockReportService {

    List<Product> getLowStockProducts(Integer stockQuantity);

    long getLowStockCount(Integer stockQuantity);

}