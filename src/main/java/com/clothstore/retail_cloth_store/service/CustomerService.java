package com.clothstore.retail_cloth_store.service;

import com.clothstore.retail_cloth_store.dto.CustomerDto;
import com.clothstore.retail_cloth_store.dto.DashboardDto;

import java.util.List;

public interface CustomerService {

    CustomerDto createCustomer(
            CustomerDto customerDto);

    CustomerDto getCustomerById(
            Long id);

    List<CustomerDto> getAllCustomers();

    CustomerDto updateCustomer(
            Long id,
            CustomerDto customerDto);

    void deleteCustomer(
            Long id);

   // DashboardDto getDashboard();
}
