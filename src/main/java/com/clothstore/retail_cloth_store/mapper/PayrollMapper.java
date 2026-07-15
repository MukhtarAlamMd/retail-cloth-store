package com.clothstore.retail_cloth_store.mapper;

import com.clothstore.retail_cloth_store.dto.PayrollDto;
import com.clothstore.retail_cloth_store.entity.Payroll;
import org.springframework.stereotype.Component;

@Component
public class PayrollMapper {

    public PayrollDto toDto(Payroll payroll) {

        if (payroll == null) {
            return null;
        }

        PayrollDto dto = new PayrollDto();

        dto.setId(payroll.getId());

        if (payroll.getEmployee() != null) {

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
        }

        dto.setMonth(
                payroll.getMonth()
        );

        dto.setYear(
                payroll.getYear()
        );

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

    public Payroll toEntity(PayrollDto dto) {

        if (dto == null) {
            return null;
        }

        Payroll payroll = new Payroll();

        payroll.setId(dto.getId());

        payroll.setMonth(
                dto.getMonth()
        );

        payroll.setYear(
                dto.getYear()
        );

        payroll.setBasicSalary(
                dto.getBasicSalary()
        );

        payroll.setBonus(
                dto.getBonus()
        );

        payroll.setDeduction(
                dto.getDeduction()
        );

        payroll.setNetSalary(
                dto.getNetSalary()
        );

        payroll.setPaymentDate(
                dto.getPaymentDate()
        );

        payroll.setPaymentStatus(
                dto.getPaymentStatus()
        );

        return payroll;
    }
}