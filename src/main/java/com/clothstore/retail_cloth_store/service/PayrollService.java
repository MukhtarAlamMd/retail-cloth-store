package com.clothstore.retail_cloth_store.service;

import com.clothstore.retail_cloth_store.dto.PayrollDto;

import java.util.List;

public interface PayrollService {

    // Create Payroll
    PayrollDto createPayroll(PayrollDto payrollDto);

    // Update Payroll
    PayrollDto updatePayroll(Long id, PayrollDto payrollDto);

    // Get Payroll By Id
    PayrollDto getPayrollById(Long id);

    // Get All Payroll
    List<PayrollDto> getAllPayrolls();

    // Delete Payroll
    void deletePayroll(Long id);

    // Get Payroll By Employee
    List<PayrollDto> getPayrollByEmployee(Long employeeId);

    // Get Payroll By Payment Status
    List<PayrollDto> getPayrollByPaymentStatus(String paymentStatus);

    // Get Payroll By Month & Year
    List<PayrollDto> getPayrollByMonthAndYear(String month, Integer year);

    // Mark Salary as Paid
    PayrollDto markAsPaid(Long id);

    // Mark Salary as Pending
    PayrollDto markAsPending(Long id);

}