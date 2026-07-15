package com.clothstore.retail_cloth_store.service;

import com.clothstore.retail_cloth_store.dto.PaymentDto;

import java.util.List;

public interface PaymentService {

    // Create Payment
    PaymentDto createPayment(PaymentDto paymentDto);

    // Get All Payments
    List<PaymentDto> getAllPayments();

    // Get Payment By Id
    PaymentDto getPaymentById(Long id);

    // Update Payment
    PaymentDto updatePayment(Long id, PaymentDto paymentDto);

    // Delete Payment
    void deletePayment(Long id);
}