package com.clothstore.retail_cloth_store.repository;

import com.clothstore.retail_cloth_store.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository
        extends JpaRepository<Product, Long> {

    long count();

    // Returns all products whose stock is <= the given quantity
    List<Product> findByStockQuantityLessThanEqual(Integer stockQuantity);

    // Returns the number of products whose stock is <= the given quantity
    long countByStockQuantityLessThanEqual(Integer stockQuantity);

}