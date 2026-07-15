package com.clothstore.retail_cloth_store.controller;

import com.clothstore.retail_cloth_store.dto.CustomerDto;
import com.clothstore.retail_cloth_store.service.CustomerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {

    private final CustomerService customerService;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','CASHIER')")
    public CustomerDto createCustomer(
            @Valid @RequestBody CustomerDto dto) {

        return customerService.createCustomer(dto);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','CASHIER')")
    public CustomerDto getCustomerById(
            @PathVariable Long id) {

        return customerService.getCustomerById(id);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','CASHIER')")
    public List<CustomerDto> getAllCustomers() {

        return customerService.getAllCustomers();
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','CASHIER')")
    public CustomerDto updateCustomer(
            @PathVariable Long id,
            @Valid @RequestBody CustomerDto dto) {

        return customerService.updateCustomer(id, dto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteCustomer(
            @PathVariable Long id) {

        customerService.deleteCustomer(id);

        return "Customer deleted successfully";
    }
}