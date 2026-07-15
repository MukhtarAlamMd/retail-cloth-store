package com.clothstore.retail_cloth_store.repository;

import com.clothstore.retail_cloth_store.entity.Payroll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PayrollRepository extends JpaRepository<Payroll, Long> {

    // Get payroll records of an employee
    List<Payroll> findByEmployeeId(Long employeeId);

    // Get payroll by payment status
    List<Payroll> findByPaymentStatus(String paymentStatus);

    // Get payroll by month and year
    List<Payroll> findByMonthAndYear(String month, Integer year);

    // Check duplicate payroll for employee in same month/year
    Optional<Payroll> findByEmployeeIdAndMonthAndYear(
            Long employeeId,
            String month,
            Integer year
    );

}