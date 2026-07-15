package com.clothstore.retail_cloth_store.mapper;

import com.clothstore.retail_cloth_store.dto.ProductDTO;
import com.clothstore.retail_cloth_store.entity.Product;

public class ProductMapper {

    // Entity -> DTO
    public static ProductDTO mapToDTO(Product product) {

        ProductDTO dto = new ProductDTO();

        dto.setId(product.getId());
        dto.setName(product.getName());

        if (product.getCategory() != null) {
            dto.setCategoryId(product.getCategory().getId());
            dto.setCategoryName(product.getCategory().getName());
        }

        dto.setSize(product.getSize());
        dto.setColor(product.getColor());
        dto.setPrice(product.getPrice());
        dto.setStockQuantity(product.getStockQuantity());

        return dto;
    }

    // DTO -> Entity
    public static Product mapToEntity(ProductDTO dto) {

        Product product = new Product();

        product.setId(dto.getId());
        product.setName(dto.getName());
        product.setSize(dto.getSize());
        product.setColor(dto.getColor());
        product.setPrice(dto.getPrice());
        product.setStockQuantity(dto.getStockQuantity());

        // Do NOT set category here.
        // Category is set in ProductServiceImpl.

        return product;
    }
}