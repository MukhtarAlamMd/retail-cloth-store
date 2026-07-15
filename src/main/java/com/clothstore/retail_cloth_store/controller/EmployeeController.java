package com.clothstore.retail_cloth_store.controller;

import com.clothstore.retail_cloth_store.dto.EmployeeDto;
import com.clothstore.retail_cloth_store.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")


public class EmployeeController {

    private final EmployeeService employeeService;

    // ==========================================
    // Create Employee
    // ==========================================

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public EmployeeDto createEmployee(
            @RequestBody EmployeeDto employeeDto) {

        return employeeService.createEmployee(employeeDto);
    }

    // ==========================================
    // Update Employee
    // ==========================================

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public EmployeeDto updateEmployee(
            @PathVariable Long id,
            @RequestBody EmployeeDto employeeDto) {

        return employeeService.updateEmployee(id, employeeDto);
    }

    // ==========================================
    // Get Employee By Id
    // ==========================================

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public EmployeeDto getEmployeeById(
            @PathVariable Long id) {

        return employeeService.getEmployeeById(id);
    }

    // ==========================================
    // Get All Employees
    // ==========================================

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<EmployeeDto> getAllEmployees() {

        return employeeService.getAllEmployees();
    }

    // ==========================================
    // Delete Employee
    // ==========================================

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteEmployee(
            @PathVariable Long id) {

        employeeService.deleteEmployee(id);

        return "Employee deleted successfully.";
    }

    // ==========================================
    // Search Employee
    // ==========================================

    @GetMapping("/search")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<EmployeeDto> searchEmployee(

            @RequestParam String name) {

        return employeeService.searchEmployee(name);
    }

    // ==========================================
    // Department
    // ==========================================

    @GetMapping("/department/{department}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<EmployeeDto> getEmployeesByDepartment(

            @PathVariable String department) {

        return employeeService
                .getEmployeesByDepartment(department);
    }

    // ==========================================
    // Status
    // ==========================================

    @GetMapping("/status/{status}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<EmployeeDto> getEmployeesByStatus(

            @PathVariable String status) {

        return employeeService
                .getEmployeesByStatus(status);
    }

    // ==========================================
    // Employee Code
    // ==========================================

    @GetMapping("/code/{employeeCode}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public EmployeeDto getEmployeeByCode(

            @PathVariable String employeeCode) {

        return employeeService
                .getEmployeeByCode(employeeCode);
    }

    // ==========================================
    // Email
    // ==========================================

    @GetMapping("/email/{email}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public EmployeeDto getEmployeeByEmail(

            @PathVariable String email) {

        return employeeService
                .getEmployeeByEmail(email);
    }

}