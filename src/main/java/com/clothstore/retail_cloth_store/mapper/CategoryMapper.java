package com.clothstore.retail_cloth_store.mapper;

import com.clothstore.retail_cloth_store.dto.CategoryDto;
import com.clothstore.retail_cloth_store.entity.Category;

public class CategoryMapper {

    public static Category toEntity(CategoryDto dto){

        Category category=new Category();

        category.setId(dto.getId());
        category.setName(dto.getName());
        category.setDescription(dto.getDescription());

        return category;
    }

    public static CategoryDto toDto(Category category){

        CategoryDto dto=new CategoryDto();

        dto.setId(category.getId());
        dto.setName(category.getName());
        dto.setDescription(category.getDescription());

        return dto;
    }

}