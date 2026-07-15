package com.clothstore.retail_cloth_store.service;

import com.clothstore.retail_cloth_store.dto.EmployeeDto;

import java.util.List;

public interface EmployeeService {

    // Create Employee
    EmployeeDto createEmployee(EmployeeDto employeeDto);

    // Update Employee
    EmployeeDto updateEmployee(Long id, EmployeeDto employeeDto);

    // Get Employee By Id
    EmployeeDto getEmployeeById(Long id);

    // Get All Employees
    List<EmployeeDto> getAllEmployees();

    // Delete Employee
    void deleteEmployee(Long id);

    // Search Employee By Name
    List<EmployeeDto> searchEmployee(String firstName);

    // Get Employees By Department
    List<EmployeeDto> getEmployeesByDepartment(String department);

    // Get Employees By Status
    List<EmployeeDto> getEmployeesByStatus(String status);

    // Get Employee By Employee Code
    EmployeeDto getEmployeeByCode(String employeeCode);

    // Get Employee By Email
    EmployeeDto getEmployeeByEmail(String email);
}