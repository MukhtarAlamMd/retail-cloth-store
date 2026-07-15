package com.clothstore.retail_cloth_store.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PayrollDto {

    private Long id;

    private Long employeeId;

    private String employeeCode;

    private String employeeName;

    private String department;

    private String designation;

    private String month;

    private Integer year;

    private Double basicSalary;

    private Double bonus;

    private Double deduction;

    private Double netSalary;

    private LocalDate paymentDate;

    private String paymentStatus;

}