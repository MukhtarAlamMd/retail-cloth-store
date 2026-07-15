package com.clothstore.retail_cloth_store.service.impl;

import com.clothstore.retail_cloth_store.dto.PayrollDto;
import com.clothstore.retail_cloth_store.entity.Employee;
import com.clothstore.retail_cloth_store.entity.Payroll;
import com.clothstore.retail_cloth_store.repository.EmployeeRepository;
import com.clothstore.retail_cloth_store.repository.PayrollRepository;
import com.clothstore.retail_cloth_store.service.PayrollService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PayrollServiceImpl implements PayrollService {

    private final PayrollRepository payrollRepository;

    private final EmployeeRepository employeeRepository;

    @Override
    public PayrollDto createPayroll(PayrollDto payrollDto) {

        Employee employee = employeeRepository.findById(
                payrollDto.getEmployeeId()
        ).orElseThrow(() ->
                new RuntimeException("Employee not found"));

        Optional<Payroll> existingPayroll =
                payrollRepository.findByEmployeeIdAndMonthAndYear(
                        payrollDto.getEmployeeId(),
                        payrollDto.getMonth(),
                        payrollDto.getYear()
                );

        if (existingPayroll.isPresent()) {

            throw new RuntimeException(
                    "Payroll already generated for this employee."
            );

        }

        Payroll payroll = new Payroll();

        payroll.setEmployee(employee);

        payroll.setMonth(payrollDto.getMonth());

        payroll.setYear(payrollDto.getYear());

        payroll.setBasicSalary(payrollDto.getBasicSalary());

        payroll.setBonus(payrollDto.getBonus());

        payroll.setDeduction(payrollDto.getDeduction());

        payroll.setNetSalary(
                payrollDto.getBasicSalary()
                        + payrollDto.getBonus()
                        - payrollDto.getDeduction()
        );

        payroll.setPaymentDate(
                payrollDto.getPaymentDate()
        );

        payroll.setPaymentStatus(
                payrollDto.getPaymentStatus()
        );

        Payroll savedPayroll =
                payrollRepository.save(payroll);

        return mapToDto(savedPayroll);

    }


    @Override
    public PayrollDto updatePayroll(Long id, PayrollDto payrollDto) {

        Payroll payroll = payrollRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Payroll not found"));

        Employee employee = employeeRepository.findById(
                payrollDto.getEmployeeId()
        ).orElseThrow(() ->
                new RuntimeException("Employee not found"));

        payroll.setEmployee(employee);

        payroll.setMonth(payrollDto.getMonth());

        payroll.setYear(payrollDto.getYear());

        payroll.setBasicSalary(payrollDto.getBasicSalary());

        payroll.setBonus(payrollDto.getBonus());

        payroll.setDeduction(payrollDto.getDeduction());

        payroll.setNetSalary(
                payrollDto.getBasicSalary()
                        + payrollDto.getBonus()
                        - payrollDto.getDeduction()
        );

        payroll.setPaymentDate(
                payrollDto.getPaymentDate()
        );

        payroll.setPaymentStatus(
                payrollDto.getPaymentStatus()
        );

        Payroll updatedPayroll = payrollRepository.save(payroll);

        return mapToDto(updatedPayroll);
    }

    @Override
    public PayrollDto getPayrollById(Long id) {

        Payroll payroll = payrollRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Payroll not found"));

        return mapToDto(payroll);
    }

    @Override
    public List<PayrollDto> getAllPayrolls() {

        return payrollRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deletePayroll(Long id) {

        Payroll payroll = payrollRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Payroll not found"));

        payrollRepository.delete(payroll);
    }

    @Override
    public List<PayrollDto> getPayrollByEmployee(Long employeeId) {

        return payrollRepository.findByEmployeeId(employeeId)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<PayrollDto> getPayrollByPaymentStatus(String paymentStatus) {

        return payrollRepository.findByPaymentStatus(paymentStatus)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<PayrollDto> getPayrollByMonthAndYear(
            String month,
            Integer year
    ) {

        return payrollRepository.findByMonthAndYear(month, year)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public PayrollDto markAsPaid(Long id) {

        Payroll payroll = payrollRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Payroll not found"));

        payroll.setPaymentStatus("PAID");

        Payroll updatedPayroll = payrollRepository.save(payroll);

        return mapToDto(updatedPayroll);
    }

    @Override
    public PayrollDto markAsPending(Long id) {

        Payroll payroll = payrollRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Payroll not found"));

        payroll.setPaymentStatus("PENDING");

        Payroll updatedPayroll = payrollRepository.save(payroll);

        return mapToDto(updatedPayroll);
    }

    private PayrollDto mapToDto(Payroll payroll) {

        PayrollDto dto = new PayrollDto();

        dto.setId(payroll.getId());

        dto.setEmployeeId(payroll.getEmployee().getId());

        dto.setEmployeeCode(
                payroll.getEmployee().getEmployeeCode()
        );

        dto.setEmployeeName(
                payroll.getEmployee().getFirstName()
                        + " "
                        + payroll.getEmployee().getLastName()
        );

        dto.setDepartment(
                payroll.getEmployee().getDepartment()
        );

        dto.setDesignation(
                payroll.getEmployee().getDesignation()
        );

        dto.setMonth(payroll.getMonth());

        dto.setYear(payroll.getYear());

        dto.setBasicSalary(
                payroll.getBasicSalary()
        );

        dto.setBonus(
                payroll.getBonus()
        );

        dto.setDeduction(
                payroll.getDeduction()
        );

        dto.setNetSalary(
                payroll.getNetSalary()
        );

        dto.setPaymentDate(
                payroll.getPaymentDate()
        );

        dto.setPaymentStatus(
                payroll.getPaymentStatus()
        );

        return dto;
    }

}