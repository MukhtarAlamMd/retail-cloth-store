package com.clothstore.retail_cloth_store.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class SaleDto {

    private Long id;

    private String invoiceNumber;

    private Long customerId;

    private String customerName;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime saleDate;

    private String paymentStatus;

    private Double grandTotal;

    private List<SaleItemDto> items;
}