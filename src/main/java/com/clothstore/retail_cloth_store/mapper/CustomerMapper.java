package com.clothstore.retail_cloth_store.mapper;

import com.clothstore.retail_cloth_store.dto.CustomerDto;
import com.clothstore.retail_cloth_store.entity.Customer;

public class CustomerMapper {

    public static CustomerDto mapToDto(Customer customer) {

        CustomerDto dto = new CustomerDto();

        dto.setId(customer.getId());
        dto.setFirstName(customer.getFirstName());
        dto.setLastName(customer.getLastName());
        dto.setGender(customer.getGender());
        dto.setMobile(customer.getMobile());
        dto.setEmail(customer.getEmail());
        dto.setAddress(customer.getAddress());
        dto.setCity(customer.getCity());
        dto.setState(customer.getState());
        dto.setPinCode(customer.getPinCode());

        return dto;
    }

    public static Customer mapToEntity(CustomerDto dto) {

        Customer customer = new Customer();

        customer.setId(dto.getId());
        customer.setFirstName(dto.getFirstName());
        customer.setLastName(dto.getLastName());
        customer.setGender(dto.getGender());
        customer.setMobile(dto.getMobile());
        customer.setEmail(dto.getEmail());
        customer.setAddress(dto.getAddress());
        customer.setCity(dto.getCity());
        customer.setState(dto.getState());
        customer.setPinCode(dto.getPinCode());

        return customer;
    }
}