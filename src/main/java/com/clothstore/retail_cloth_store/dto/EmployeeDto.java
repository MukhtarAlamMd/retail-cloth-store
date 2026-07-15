package com.clothstore.retail_cloth_store.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeDto {

    private Long employeeId;

    private String employeeCode;

    private String firstName;

    private String lastName;

    private String gender;

    private LocalDate dateOfBirth;

    private String phone;

    private String email;

    private String address;

    private String designation;

    private String department;

    private Double salary;

    private LocalDate joiningDate;

    private String status;

    private String departmentName;

    private String designationName;


}