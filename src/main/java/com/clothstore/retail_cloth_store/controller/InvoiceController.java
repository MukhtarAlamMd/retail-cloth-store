package com.clothstore.retail_cloth_store.controller;

import com.clothstore.retail_cloth_store.dto.InvoiceDto;
import com.clothstore.retail_cloth_store.entity.Invoice;
import com.clothstore.retail_cloth_store.service.InvoiceService;
import com.clothstore.retail_cloth_store.util.PdfGenerator;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.util.List;

@RestController
@RequestMapping("/api/invoices")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class InvoiceController {

    private final InvoiceService invoiceService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Invoice generateInvoice(
            @Valid @RequestBody InvoiceDto dto) {

        return invoiceService.generateInvoice(dto);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<Invoice> getAllInvoices() {
        return invoiceService.getAllInvoices();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public Invoice getInvoice(
            @PathVariable Long id) {

        return invoiceService.getInvoice(id);
    }

    @GetMapping("/pdf/{saleId}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','CASHIER')")
    public ResponseEntity<InputStreamResource> downloadInvoice(
            @PathVariable Long saleId) {

        InvoiceDto invoice =
                invoiceService.generateInvoiceDto(saleId);

        ByteArrayInputStream pdf =
                PdfGenerator.invoicePdf(invoice);

        HttpHeaders headers = new HttpHeaders();

        headers.add(
                HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=invoice-" + saleId + ".pdf"
        );

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(pdf));
    }
}