package com.clothstore.retail_cloth_store.service.impl;

import com.clothstore.retail_cloth_store.dto.ProductDTO;
import com.clothstore.retail_cloth_store.entity.Category;
import com.clothstore.retail_cloth_store.entity.Product;
import com.clothstore.retail_cloth_store.exception.ResourceNotFoundException;
import com.clothstore.retail_cloth_store.mapper.ProductMapper;
import com.clothstore.retail_cloth_store.repository.CategoryRepository;
import com.clothstore.retail_cloth_store.repository.ProductRepository;
import com.clothstore.retail_cloth_store.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl
        implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public ProductDTO createProduct(ProductDTO productDTO) {

        Category category = categoryRepository.findById(productDTO.getCategoryId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category not found"));

        Product product = ProductMapper.mapToEntity(productDTO);

        product.setCategory(category);

        Product saved = productRepository.save(product);

        return ProductMapper.mapToDTO(saved);
    }

    @Override
    public ProductDTO getProductById(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Product not found with id : " + id));

        return ProductMapper.mapToDTO(product);
    }

    @Override
    public Page<ProductDTO> getAllProducts(Pageable pageable) {

        return productRepository
                .findAll(pageable)
                .map(ProductMapper::mapToDTO);

    }

    @Override
    public ProductDTO updateProduct(
            Long id,
            ProductDTO productDTO) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found"));

        Category category = categoryRepository.findById(productDTO.getCategoryId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category not found"));

        product.setName(productDTO.getName());
        product.setCategory(category);
        product.setSize(productDTO.getSize());
        product.setColor(productDTO.getColor());
        product.setPrice(productDTO.getPrice());
        product.setStockQuantity(productDTO.getStockQuantity());

        Product updated = productRepository.save(product);

        return ProductMapper.mapToDTO(updated);
    }

    @Override
    public void deleteProduct(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found"));

        productRepository.delete(product);
    }

}