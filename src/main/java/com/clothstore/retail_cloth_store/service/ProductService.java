package com.clothstore.retail_cloth_store.service;

import com.clothstore.retail_cloth_store.dto.ProductDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService {

    ProductDTO createProduct(ProductDTO productDTO);

    ProductDTO getProductById(Long id);

    Page<ProductDTO> getAllProducts(Pageable pageable);

    ProductDTO updateProduct(Long id,
                             ProductDTO productDTO);

    void deleteProduct(Long id);

}