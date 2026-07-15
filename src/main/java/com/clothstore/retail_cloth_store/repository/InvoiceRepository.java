package com.clothstore.retail_cloth_store.repository;

import com.clothstore.retail_cloth_store.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceRepository
        extends JpaRepository<Invoice,Long> {

}