package com.clothstore.retail_cloth_store.service;

import com.clothstore.retail_cloth_store.dto.InvoiceDto;
import com.clothstore.retail_cloth_store.entity.Invoice;

import java.util.List;

public interface InvoiceService {

    // Save Invoice in Database
    Invoice generateInvoice(InvoiceDto dto);

    // Generate Invoice DTO for PDF
    InvoiceDto generateInvoiceDto(Long saleId);

    // Get All Invoices
    List<Invoice> getAllInvoices();

    // Get Invoice By Id
    Invoice getInvoice(Long id);

}