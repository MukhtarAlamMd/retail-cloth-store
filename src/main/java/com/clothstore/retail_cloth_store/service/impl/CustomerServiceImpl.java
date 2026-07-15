package com.clothstore.retail_cloth_store.service.impl;

import com.clothstore.retail_cloth_store.dto.CustomerDto;
import com.clothstore.retail_cloth_store.dto.DashboardDto;
import com.clothstore.retail_cloth_store.entity.Customer;
import com.clothstore.retail_cloth_store.exception.ResourceNotFoundException;
import com.clothstore.retail_cloth_store.mapper.CustomerMapper;
import com.clothstore.retail_cloth_store.repository.CustomerRepository;
import com.clothstore.retail_cloth_store.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl
        implements CustomerService {

    private final CustomerRepository customerRepository;

    @Override
    public CustomerDto createCustomer(
            CustomerDto customerDto) {

        Customer customer =
                CustomerMapper.mapToEntity(customerDto);

        Customer saved =
                customerRepository.save(customer);

        return CustomerMapper.mapToDto(saved);
    }

    @Override
    public CustomerDto getCustomerById(
            Long id) {

        Customer customer =
                customerRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Customer not found with id : " + id));

        return CustomerMapper.mapToDto(customer);
    }

    @Override
    public List<CustomerDto> getAllCustomers() {

        return customerRepository.findAll()
                .stream()
                .map(CustomerMapper::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public CustomerDto updateCustomer(
            Long id,
            CustomerDto customerDto) {

        Customer customer =
                customerRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Customer not found with id : " + id));

        customer.setFirstName(customerDto.getFirstName());
        customer.setLastName(customerDto.getLastName());
        customer.setGender(customerDto.getGender());
        customer.setMobile(customerDto.getMobile());
        customer.setEmail(customerDto.getEmail());
        customer.setAddress(customerDto.getAddress());
        customer.setCity(customerDto.getCity());
        customer.setState(customerDto.getState());
        customer.setPinCode(customerDto.getPinCode());
        Customer updated =
                customerRepository.save(customer);

        return CustomerMapper.mapToDto(updated);
    }

    @Override
    public void deleteCustomer(
            Long id) {

        Customer customer =
                customerRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Customer not found with id : " + id));

        customerRepository.delete(customer);
    }


}