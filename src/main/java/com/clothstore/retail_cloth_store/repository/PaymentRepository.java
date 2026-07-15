package com.clothstore.retail_cloth_store.repository;

import com.clothstore.retail_cloth_store.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaymentRepository
        extends JpaRepository<Payment,Long> {

    Optional<Payment> findByInvoiceId(Long invoiceId);

}