package com.clothstore.retail_cloth_store.repository;

import com.clothstore.retail_cloth_store.entity.CustomerPayment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomerPaymentRepository
        extends JpaRepository<CustomerPayment, Long> {
    List<CustomerPayment> findByCustomerId(Long customerId);
}