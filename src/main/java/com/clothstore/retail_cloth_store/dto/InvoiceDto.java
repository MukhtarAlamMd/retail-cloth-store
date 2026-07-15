package com.clothstore.retail_cloth_store.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvoiceDto {

    private Long saleId;

    private String invoiceNumber;

    private Long customerId;

    private String customerName;

    private String customerMobile;

    private Long productId;

    private String productName;

    private Integer quantity;

    private Double unitPrice;

    private Double subtotal;

    private Double discount;

    private Double gst;

    private Double grandTotal;

    private LocalDateTime invoiceDate;
}