package com.clothstore.retail_cloth_store.service.impl;

import com.clothstore.retail_cloth_store.dto.LowStockDto;
import com.clothstore.retail_cloth_store.entity.Product;
import com.clothstore.retail_cloth_store.repository.ProductRepository;
import com.clothstore.retail_cloth_store.service.LowStockService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LowStockServiceImpl
        implements LowStockService {

    private static final int MINIMUM_STOCK = 10;

    private final ProductRepository productRepository;

    @Override
    public List<LowStockDto> getLowStockProducts() {

        return productRepository
                .findByStockQuantityLessThanEqual(MINIMUM_STOCK)
                .stream()
                .map(this::convert)
                .toList();
    }

    private LowStockDto convert(Product product) {

        String status =
                product.getStockQuantity() == 0
                        ? "OUT OF STOCK"
                        : "LOW STOCK";

        return LowStockDto.builder()

                .productId(product.getId())

                .productName(product.getName())

                .category(product.getCategory().getName())

                .quantity(product.getStockQuantity())

                .minimumStock(MINIMUM_STOCK)

                .status(status)

                .build();
    }
}