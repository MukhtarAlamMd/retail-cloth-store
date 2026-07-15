package com.clothstore.retail_cloth_store.controller;

import com.clothstore.retail_cloth_store.dto.CategoryDto;
import com.clothstore.retail_cloth_store.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public CategoryDto createCategory(
            @Valid @RequestBody CategoryDto dto) {

        return categoryService.createCategory(dto);
    }

    @GetMapping
    public List<CategoryDto> getAllCategories() {

        return categoryService.getAllCategories();
    }

    @GetMapping("/{id}")
    public CategoryDto getCategory(
            @PathVariable Long id) {

        return categoryService.getCategory(id);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public CategoryDto updateCategory(
            @PathVariable Long id,
            @Valid @RequestBody CategoryDto dto) {

        return categoryService.updateCategory(id, dto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteCategory(
            @PathVariable Long id) {

        categoryService.deleteCategory(id);

        return "Category deleted successfully";
    }
}