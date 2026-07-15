package com.clothstore.retail_cloth_store.repository;

import com.clothstore.retail_cloth_store.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository
        extends JpaRepository<Category,Long>{

    long count();

    Optional<Category> findByName(String name);

    boolean existsByName(String name);

}