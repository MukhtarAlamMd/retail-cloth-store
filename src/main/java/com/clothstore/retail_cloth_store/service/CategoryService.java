package com.clothstore.retail_cloth_store.service;

import com.clothstore.retail_cloth_store.dto.CategoryDto;

import java.util.List;

public interface CategoryService {

    CategoryDto createCategory(CategoryDto dto);

    CategoryDto updateCategory(Long id,CategoryDto dto);

    CategoryDto getCategory(Long id);

    List<CategoryDto> getAllCategories();

    void deleteCategory(Long id);

}