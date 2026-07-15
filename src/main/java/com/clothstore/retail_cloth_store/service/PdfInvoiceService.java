package com.clothstore.retail_cloth_store.service;

public interface PdfInvoiceService {

    byte[] generatePdf(Long saleId);

}