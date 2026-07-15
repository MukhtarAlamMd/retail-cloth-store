package com.clothstore.retail_cloth_store.dto;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReportDto {

    private String employeeCode;

    private String firstName;

    private String lastName;

    private LocalDate attendanceDate;

    private LocalTime checkIn;

    private LocalTime checkOut;

    private String remarks;

    private String attendanceStatus;

    // Supplier
    private Long supplierId;

    private String contactPerson;

    private String mobile;

    private String email;

    private String gstNumber;

    private String city;

    private String state;

    private Double totalPurchaseAmount;

    // Customer
    private Long customerId;


    private String phone;

    private String address;

    // Dashboard
    private String reportName;

    private Long totalRecords;

    private Double totalIncome;

    private Double totalExpense;

    private Double profit;

    // Common Amount
    private Double totalAmount;

    // Sales
    private Long saleId;

    private String invoiceNumber;

    private LocalDateTime saleDate;

    private String customerName;

    // Purchase
    private Long purchaseId;

    private LocalDateTime purchaseDate;

    private String supplierName;

    // Product
    private Long productId;

    private String productName;

    private Integer stockQuantity;



    private LocalTime checkInTime;
    private LocalTime checkOutTime;

    // Employee
    private Long employeeId;

    private String department;
    private String designation;
    private String status;
    private String employeeName;

    // Attendance
    private Long attendanceId;

    // Payroll
    private Long payrollId;

    private String month;

    private Integer year;

    private Double basicSalary;

    private Double bonus;

    private Double deduction;

    private Double netSalary;

    private LocalDate paymentDate;

    private String paymentStatus;



    // Leave
    private Long leaveId;

    private String leaveType;

    private String leaveStatus;

    private LocalDate fromDate;

    private LocalDate toDate;

    private Integer totalDays;
    private String reason;

    // Expense
    private Long expenseId;

    private String expenseName;

    private String expenseCategory;

    private Double expenseAmount;
}