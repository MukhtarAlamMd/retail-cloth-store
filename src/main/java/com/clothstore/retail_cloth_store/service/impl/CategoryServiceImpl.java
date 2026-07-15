package com.clothstore.retail_cloth_store.service.impl;

import com.clothstore.retail_cloth_store.dto.CategoryDto;
import com.clothstore.retail_cloth_store.entity.Category;
import com.clothstore.retail_cloth_store.exception.CategoryAlreadyExistsException;
import com.clothstore.retail_cloth_store.exception.ResourceNotFoundException;
import com.clothstore.retail_cloth_store.mapper.CategoryMapper;
import com.clothstore.retail_cloth_store.repository.CategoryRepository;
import com.clothstore.retail_cloth_store.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl
        implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public CategoryDto createCategory(CategoryDto dto) {

        if (categoryRepository.existsByName(dto.getName())) {

            throw new CategoryAlreadyExistsException(
                    "Category already exists."
            );
        }

        Category category =
                CategoryMapper.toEntity(dto);

        Category saved =
                categoryRepository.save(category);

        return CategoryMapper.toDto(saved);
    }

    @Override
    public CategoryDto updateCategory(
            Long id,
            CategoryDto dto) {

        Category category =
                categoryRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Category not found"));

        category.setName(dto.getName());
        category.setDescription(dto.getDescription());

        Category updated =
                categoryRepository.save(category);

        return CategoryMapper.toDto(updated);
    }

    @Override
    public CategoryDto getCategory(Long id) {

        Category category =
                categoryRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Category not found"));

        return CategoryMapper.toDto(category);
    }

    @Override
    public List<CategoryDto> getAllCategories() {

        return categoryRepository.findAll()
                .stream()
                .map(CategoryMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteCategory(Long id) {

        Category category =
                categoryRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Category not found"));

        categoryRepository.delete(category);
    }
}