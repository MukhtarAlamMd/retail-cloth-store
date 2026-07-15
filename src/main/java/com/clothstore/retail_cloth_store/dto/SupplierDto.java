package com.clothstore.retail_cloth_store.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class SupplierDto {

    private Long id;

    @NotBlank(message = "Supplier Name is required")
    private String supplierName;

    @NotBlank(message = "Contact Person is required")
    private String contactPerson;

    @Email(message = "Invalid Email")
    @NotBlank(message = "Email is required")
    private String email;

    @Pattern(
            regexp = "^[0-9]{10}$",
            message = "Mobile must contain 10 digits"
    )
    private String mobile;

    private String gstNumber;

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "State is required")
    private String state;

    @Pattern(
            regexp = "^[0-9]{6}$",
            message = "PIN Code must contain 6 digits"
    )
    private String pinCode;
}