package com.clothstore.retail_cloth_store.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerPaymentDto {

    private Long id;

    private Long customerId;

    private String customerName;

    private Double amount;

    private LocalDate paymentDate;

    private String paymentMethod;

    private String referenceNumber;

    private String remarks;
}