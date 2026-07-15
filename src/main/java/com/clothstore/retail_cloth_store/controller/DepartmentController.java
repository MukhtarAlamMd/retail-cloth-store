package com.clothstore.retail_cloth_store.controller;

import com.clothstore.retail_cloth_store.dto.DepartmentDto;
import com.clothstore.retail_cloth_store.service.DepartmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class DepartmentController {

    private final DepartmentService departmentService;

    // ============================
    // Create Department
    // ============================

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public DepartmentDto createDepartment(
            @Valid @RequestBody DepartmentDto departmentDto) {

        return departmentService.createDepartment(departmentDto);
    }

    // ============================
    // Update Department
    // ============================

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public DepartmentDto updateDepartment(
            @PathVariable Long id,
            @Valid @RequestBody DepartmentDto departmentDto) {

        return departmentService.updateDepartment(id, departmentDto);
    }

    // ============================
    // Get Department By Id
    // ============================

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','EMPLOYEE')")
    public DepartmentDto getDepartmentById(
            @PathVariable Long id) {

        return departmentService.getDepartmentById(id);
    }

    // ============================
    // Get All Departments
    // ============================

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','EMPLOYEE')")
    public List<DepartmentDto> getAllDepartments() {

        return departmentService.getAllDepartments();
    }

    // ============================
    // Delete Department
    // ============================

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteDepartment(
            @PathVariable Long id) {

        departmentService.deleteDepartment(id);
    }

    // ============================
    // Search By Department Name
    // ============================

    @GetMapping("/search/name")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','EMPLOYEE')")
    public List<DepartmentDto> searchByDepartmentName(
            @RequestParam String keyword) {

        return departmentService.searchByDepartmentName(keyword);
    }

    // ============================
    // Search By Department Code
    // ============================

    @GetMapping("/search/code")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','EMPLOYEE')")
    public List<DepartmentDto> searchByDepartmentCode(
            @RequestParam String keyword) {

        return departmentService.searchByDepartmentCode(keyword);
    }

    // ============================
    // Filter By Status
    // ============================

    @GetMapping("/status/{status}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','EMPLOYEE')")
    public List<DepartmentDto> getDepartmentsByStatus(
            @PathVariable String status) {

        return departmentService.getDepartmentsByStatus(status);
    }

}