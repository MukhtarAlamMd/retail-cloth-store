package com.clothstore.retail_cloth_store.service.impl;

import com.clothstore.retail_cloth_store.dto.EmployeeDto;
import com.clothstore.retail_cloth_store.entity.Employee;
import com.clothstore.retail_cloth_store.repository.EmployeeRepository;
import com.clothstore.retail_cloth_store.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    // ============================
    // Create Employee
    // ============================

    @Override
    public EmployeeDto createEmployee(EmployeeDto dto) {

        if (employeeRepository.existsByEmployeeCode(dto.getEmployeeCode())) {
            throw new RuntimeException("Employee Code already exists.");
        }

        if (dto.getEmail() != null &&
                employeeRepository.existsByEmail(dto.getEmail())) {

            throw new RuntimeException("Email already exists.");
        }

        Employee employee = mapToEntity(dto);

        return mapToDto(
                employeeRepository.save(employee)
        );
    }

    // ============================
    // Update Employee
    // ============================

    @Override
    public EmployeeDto updateEmployee(Long id, EmployeeDto dto) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Employee not found."));

        employee.setEmployeeCode(dto.getEmployeeCode());
        employee.setFirstName(dto.getFirstName());
        employee.setLastName(dto.getLastName());
        employee.setGender(dto.getGender());
        employee.setDateOfBirth(dto.getDateOfBirth());
        employee.setPhone(dto.getPhone());
        employee.setEmail(dto.getEmail());
        employee.setAddress(dto.getAddress());
        employee.setDesignation(dto.getDesignation());
        employee.setDepartment(dto.getDepartment());
        employee.setSalary(dto.getSalary());
        employee.setJoiningDate(dto.getJoiningDate());
        employee.setStatus(dto.getStatus());

        return mapToDto(
                employeeRepository.save(employee)
        );
    }

    // ============================
    // Get Employee By Id
    // ============================

    @Override
    public EmployeeDto getEmployeeById(Long id) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Employee not found."));

        return mapToDto(employee);
    }

    // ============================
    // Get All Employees
    // ============================

    @Override
    public List<EmployeeDto> getAllEmployees() {

        return employeeRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    // ============================
    // Delete Employee
    // ============================

    @Override
    public void deleteEmployee(Long id) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Employee not found."));

        employeeRepository.delete(employee);
    }

    // ============================
    // Search Employee
    // ============================

    @Override
    public List<EmployeeDto> searchEmployee(String firstName) {

        return employeeRepository
                .findByFirstNameContainingIgnoreCase(firstName)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    // ============================
    // Department
    // ============================

    @Override
    public List<EmployeeDto> getEmployeesByDepartment(String department) {

        return employeeRepository
                .findByDepartment(department)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    // ============================
    // Status
    // ============================

    @Override
    public List<EmployeeDto> getEmployeesByStatus(String status) {

        return employeeRepository
                .findByStatus(status)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    // ============================
    // Employee Code
    // ============================

    @Override
    public EmployeeDto getEmployeeByCode(String employeeCode) {

        Employee employee = employeeRepository
                .findByEmployeeCode(employeeCode)
                .orElseThrow(() ->
                        new RuntimeException("Employee not found."));

        return mapToDto(employee);
    }

    // ============================
    // Email
    // ============================

    @Override
    public EmployeeDto getEmployeeByEmail(String email) {

        Employee employee = employeeRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Employee not found."));

        return mapToDto(employee);
    }

    // ============================
    // Entity -> DTO
    // ============================

    private EmployeeDto mapToDto(Employee employee) {

        return EmployeeDto.builder()
                .employeeId(employee.getId())
                .employeeCode(employee.getEmployeeCode())
                .firstName(employee.getFirstName())
                .lastName(employee.getLastName())
                .gender(employee.getGender())
                .dateOfBirth(employee.getDateOfBirth())
                .phone(employee.getPhone())
                .email(employee.getEmail())
                .address(employee.getAddress())
                .designation(employee.getDesignation())
                .department(employee.getDepartment())
                .salary(employee.getSalary())
                .joiningDate(employee.getJoiningDate())
                .status(employee.getStatus())
                .build();
    }

    // ============================
    // DTO -> Entity
    // ============================

    private Employee mapToEntity(EmployeeDto dto) {

        return Employee.builder()
                .id(dto.getEmployeeId())
                .employeeCode(dto.getEmployeeCode())
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .gender(dto.getGender())
                .dateOfBirth(dto.getDateOfBirth())
                .phone(dto.getPhone())
                .email(dto.getEmail())
                .address(dto.getAddress())
                .designation(dto.getDesignation())
                .department(dto.getDepartment())
                .salary(dto.getSalary())
                .joiningDate(dto.getJoiningDate())
                .status(dto.getStatus())
                .build();
    }
}