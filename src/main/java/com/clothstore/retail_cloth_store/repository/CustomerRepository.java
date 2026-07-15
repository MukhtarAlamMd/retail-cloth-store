package com.clothstore.retail_cloth_store.repository;

import com.clothstore.retail_cloth_store.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository
        extends JpaRepository<Customer, Long> {
    long count();
}