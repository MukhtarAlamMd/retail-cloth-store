package com.clothstore.retail_cloth_store.service;

import com.clothstore.retail_cloth_store.dto.CustomerPaymentDto;

import java.util.List;

public interface CustomerPaymentService {

    // Create Customer Payment
    CustomerPaymentDto saveCustomerPayment(CustomerPaymentDto customerPaymentDto);

    // Update Customer Payment
    CustomerPaymentDto updateCustomerPayment(
            Long id,
            CustomerPaymentDto customerPaymentDto
    );

    // Get Payment By Id
    CustomerPaymentDto getCustomerPaymentById(Long id);

    // Get All Payments
    List<CustomerPaymentDto> getAllCustomerPayments();

    // Get Payments By Customer
    List<CustomerPaymentDto> getPaymentsByCustomer(Long customerId);

    // Delete Payment
    void deleteCustomerPayment(Long id);

}