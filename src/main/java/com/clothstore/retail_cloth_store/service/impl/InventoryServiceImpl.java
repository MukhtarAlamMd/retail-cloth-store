package com.clothstore.retail_cloth_store.service.impl;

import com.clothstore.retail_cloth_store.dto.InventoryDto;
import com.clothstore.retail_cloth_store.entity.Product;
import com.clothstore.retail_cloth_store.repository.ProductRepository;
import com.clothstore.retail_cloth_store.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InventoryServiceImpl implements InventoryService {

    private final ProductRepository productRepository;

    @Override
    public List<InventoryDto> getAllInventory() {

        return productRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<InventoryDto> getLowStockProducts() {

        return productRepository
                .findByStockQuantityLessThanEqual(10)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<InventoryDto> getOutOfStockProducts() {

        return productRepository
                .findByStockQuantityLessThanEqual(0)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public InventoryDto getInventoryByProduct(Long productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new RuntimeException("Product not found"));

        return convertToDto(product);
    }

    private InventoryDto convertToDto(Product product) {

        String status;

        if (product.getStockQuantity() <= 0) {

            status = "OUT OF STOCK";

        } else if (product.getStockQuantity() <= 10) {

            status = "LOW STOCK";

        } else {

            status = "IN STOCK";
        }

        return InventoryDto.builder()
                .productId(product.getId())
                .productName(product.getName())
                .categoryName(product.getCategory().getName())
                .size(product.getSize())
                .color(product.getColor())
                .price(product.getPrice())
                .stockQuantity(product.getStockQuantity())
                .stockStatus(status)
                .build();
    }

}