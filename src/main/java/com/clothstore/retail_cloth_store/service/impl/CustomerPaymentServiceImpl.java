package com.clothstore.retail_cloth_store.service.impl;

import com.clothstore.retail_cloth_store.dto.CustomerPaymentDto;
import com.clothstore.retail_cloth_store.entity.Customer;
import com.clothstore.retail_cloth_store.entity.CustomerPayment;
import com.clothstore.retail_cloth_store.repository.CustomerPaymentRepository;
import com.clothstore.retail_cloth_store.repository.CustomerRepository;
import com.clothstore.retail_cloth_store.service.CustomerPaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerPaymentServiceImpl
        implements CustomerPaymentService {

    private final CustomerPaymentRepository customerPaymentRepository;

    private final CustomerRepository customerRepository;

    @Override
    public CustomerPaymentDto saveCustomerPayment(
            CustomerPaymentDto dto) {

        Customer customer = customerRepository.findById(dto.getCustomerId())
                .orElseThrow(() ->
                        new RuntimeException("Customer not found"));

        CustomerPayment payment = CustomerPayment.builder()
                .customer(customer)
                .amount(dto.getAmount())
                .paymentDate(dto.getPaymentDate())
                .paymentMethod(dto.getPaymentMethod())
                .referenceNumber(dto.getReferenceNumber())
                .remarks(dto.getRemarks())
                .build();

        payment = customerPaymentRepository.save(payment);

        return mapToDto(payment);
    }

    @Override
    public CustomerPaymentDto updateCustomerPayment(
            Long id,
            CustomerPaymentDto dto) {

        CustomerPayment payment = customerPaymentRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Customer Payment not found"));

        Customer customer = customerRepository.findById(dto.getCustomerId())
                .orElseThrow(() ->
                        new RuntimeException("Customer not found"));

        payment.setCustomer(customer);
        payment.setAmount(dto.getAmount());
        payment.setPaymentDate(dto.getPaymentDate());
        payment.setPaymentMethod(dto.getPaymentMethod());
        payment.setReferenceNumber(dto.getReferenceNumber());
        payment.setRemarks(dto.getRemarks());

        payment = customerPaymentRepository.save(payment);

        return mapToDto(payment);
    }

    @Override
    public CustomerPaymentDto getCustomerPaymentById(Long id) {

        CustomerPayment payment = customerPaymentRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Customer Payment not found"));

        return mapToDto(payment);
    }

    @Override
    public List<CustomerPaymentDto> getAllCustomerPayments() {

        return customerPaymentRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<CustomerPaymentDto> getPaymentsByCustomer(Long customerId) {

        return customerPaymentRepository.findByCustomerId(customerId)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteCustomerPayment(Long id) {

        customerPaymentRepository.deleteById(id);
    }

    private CustomerPaymentDto mapToDto(CustomerPayment payment) {

        return CustomerPaymentDto.builder()
                .id(payment.getId())
                .customerId(payment.getCustomer().getId())
                .customerName(payment.getCustomer().getFirstName())
                .customerName(payment.getCustomer().getLastName())
                .amount(payment.getAmount())
                .paymentDate(payment.getPaymentDate())
                .paymentMethod(payment.getPaymentMethod())
                .referenceNumber(payment.getReferenceNumber())
                .remarks(payment.getRemarks())
                .build();
    }
}