package com.clothstore.retail_cloth_store.repository;

import com.clothstore.retail_cloth_store.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<Employee> findByEmployeeCode(String employeeCode);

    Optional<Employee> findByEmail(String email);

    List<Employee> findByDepartment(String department);

    List<Employee> findByStatus(String status);

    List<Employee> findByFirstNameContainingIgnoreCase(String firstName);

    boolean existsByEmployeeCode(String employeeCode);

    boolean existsByEmail(String email);
}