package com.clothstore.retail_cloth_store.repository;

import com.clothstore.retail_cloth_store.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SupplierRepository
        extends JpaRepository<Supplier, Long> {
    long count();

    Optional<Supplier> findByEmail(String email);

    boolean existsByEmail(String email);
    //List<Supplier> findByNameContainingIgnoreCase(String name);
    List<Supplier> findBySupplierNameContainingIgnoreCase(String keyword);
}