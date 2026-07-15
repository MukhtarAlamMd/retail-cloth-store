package com.clothstore.retail_cloth_store.service;

import com.clothstore.retail_cloth_store.dto.DepartmentDto;

import java.util.List;

public interface DepartmentService {

    // Create Department
    DepartmentDto createDepartment(DepartmentDto departmentDto);

    // Update Department
    DepartmentDto updateDepartment(Long id, DepartmentDto departmentDto);

    // Get Department By Id
    DepartmentDto getDepartmentById(Long id);

    // Get All Departments
    List<DepartmentDto> getAllDepartments();

    // Delete Department
    void deleteDepartment(Long id);

    // Search By Department Name
    List<DepartmentDto> searchByDepartmentName(String departmentName);

    // Search By Department Code
    List<DepartmentDto> searchByDepartmentCode(String departmentCode);

    // Get Departments By Status
    List<DepartmentDto> getDepartmentsByStatus(String status);

}