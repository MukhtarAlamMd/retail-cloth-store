package com.clothstore.retail_cloth_store.service.impl;

import com.clothstore.retail_cloth_store.dto.InvoiceDto;
import com.clothstore.retail_cloth_store.entity.Customer;
import com.clothstore.retail_cloth_store.entity.Invoice;
import com.clothstore.retail_cloth_store.entity.Sale;
import com.clothstore.retail_cloth_store.exception.ResourceNotFoundException;
import com.clothstore.retail_cloth_store.repository.CustomerRepository;
import com.clothstore.retail_cloth_store.repository.InvoiceRepository;
import com.clothstore.retail_cloth_store.repository.SaleRepository;
import com.clothstore.retail_cloth_store.service.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InvoiceServiceImpl implements InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final SaleRepository saleRepository;
    private final CustomerRepository customerRepository;

    @Override
    public Invoice generateInvoice(InvoiceDto dto) {

        Sale sale = saleRepository.findById(dto.getSaleId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Sale not found"));

        Customer customer = customerRepository.findById(dto.getCustomerId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found"));

        double subtotal = sale.getGrandTotal();

        double gstAmount =
                subtotal * dto.getGst() / 100;

        double discountAmount =
                subtotal * dto.getDiscount() / 100;

        double grandTotal =
                subtotal + gstAmount - discountAmount;

        Invoice invoice = Invoice.builder()
                .invoiceNumber("INV-" + System.currentTimeMillis())
                .sale(sale)
                .customer(customer)
                .subTotal(subtotal)
                .gst(gstAmount)
                .discount(discountAmount)
                .grandTotal(grandTotal)
                .invoiceDate(LocalDateTime.now())
                .build();

        return invoiceRepository.save(invoice);
    }


    @Override
    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    @Override
    public Invoice getInvoice(Long id) {

        return invoiceRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Invoice not found"));
    }
    @Override
    public InvoiceDto generateInvoiceDto(Long saleId) {

        Sale sale = saleRepository.findById(saleId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Sale not found"));

        double subtotal = sale.getGrandTotal();

        double discount = 0.0;

        double gst = subtotal * 0.18;

        double grandTotal = subtotal + gst - discount;

        InvoiceDto dto = InvoiceDto.builder()

                .saleId(sale.getId())

                .invoiceNumber("INV-" + sale.getId())

                .customerId(sale.getCustomer().getId())

                .customerName(
                        sale.getCustomer().getFirstName()
                                + " "
                                + sale.getCustomer().getLastName()
                )

                .customerMobile(sale.getCustomer().getMobile())

                .subtotal(subtotal)

                .discount(discount)

                .gst(gst)

                .grandTotal(grandTotal)

                .invoiceDate(sale.getSaleDate())

                .build();

        // First product only (temporary)
        if (sale.getItems() != null && !sale.getItems().isEmpty()) {

            dto.setProductId(
                    sale.getItems().get(0).getProduct().getId());

            dto.setProductName(
                    sale.getItems().get(0).getProduct().getName());

            dto.setQuantity(
                    sale.getItems().get(0).getQuantity());

            dto.setUnitPrice(
                    sale.getItems().get(0).getSellingPrice());
        }

        return dto;
    }}