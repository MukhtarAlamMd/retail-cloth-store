package com.clothstore.retail_cloth_store.dto;

import com.clothstore.retail_cloth_store.entity.PaymentMethod;
import com.clothstore.retail_cloth_store.entity.PaymentStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PaymentDto {

    private Long id;

    private Long invoiceId;

    private String invoiceNumber;

    private Double amount;

    private PaymentMethod paymentMethod;

    private PaymentStatus paymentStatus;

    private String transactionId;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime paymentDate;
}