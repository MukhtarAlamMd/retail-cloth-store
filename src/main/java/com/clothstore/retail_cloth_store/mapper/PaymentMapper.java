package com.clothstore.retail_cloth_store.mapper;

import com.clothstore.retail_cloth_store.dto.PaymentDto;
import com.clothstore.retail_cloth_store.entity.Invoice;
import com.clothstore.retail_cloth_store.entity.Payment;

public class PaymentMapper {

    // ===========================
    // ENTITY -> DTO
    // ===========================
    public static PaymentDto mapToDto(Payment payment) {

        PaymentDto dto = new PaymentDto();

        dto.setId(payment.getId());

        if (payment.getInvoice() != null) {

            dto.setInvoiceId(payment.getInvoice().getId());

            dto.setInvoiceNumber(
                    payment.getInvoice().getInvoiceNumber()
            );
        }

        dto.setAmount(payment.getAmount());
        dto.setPaymentMethod(payment.getPaymentMethod());
        dto.setPaymentStatus(payment.getPaymentStatus());
        dto.setTransactionId(payment.getTransactionId());
        dto.setPaymentDate(payment.getPaymentDate());

        return dto;
    }

    // ===========================
    // DTO -> ENTITY
    // ===========================
    public static Payment mapToEntity(PaymentDto dto) {

        Payment payment = new Payment();

        payment.setId(dto.getId());

        if (dto.getInvoiceId() != null) {

            Invoice invoice = new Invoice();
            invoice.setId(dto.getInvoiceId());

            payment.setInvoice(invoice);
        }

        payment.setAmount(dto.getAmount());
        payment.setPaymentMethod(dto.getPaymentMethod());
        payment.setPaymentStatus(dto.getPaymentStatus());
        payment.setTransactionId(dto.getTransactionId());
        payment.setPaymentDate(dto.getPaymentDate());

        return payment;
    }
}