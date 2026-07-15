package com.clothstore.retail_cloth_store.service.impl;

import com.clothstore.retail_cloth_store.dto.DepartmentDto;
import com.clothstore.retail_cloth_store.entity.Department;
import com.clothstore.retail_cloth_store.repository.DepartmentRepository;
import com.clothstore.retail_cloth_store.service.DepartmentService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;

    // ==========================================
    // Create Department
    // ==========================================

    @Override
    public DepartmentDto createDepartment(DepartmentDto departmentDto) {

        if (departmentRepository.existsByDepartmentCode(
                departmentDto.getDepartmentCode())) {

            throw new RuntimeException(
                    "Department code already exists."
            );
        }

        if (departmentRepository.existsByDepartmentName(
                departmentDto.getDepartmentName())) {

            throw new RuntimeException(
                    "Department name already exists."
            );
        }

        Department department = mapToEntity(departmentDto);

        Department savedDepartment =
                departmentRepository.save(department);

        return mapToDto(savedDepartment);
    }

    // ==========================================
    // DTO → Entity
    // ==========================================

    private Department mapToEntity(DepartmentDto dto) {

        return Department.builder()
                .id(dto.getId())
                .departmentCode(dto.getDepartmentCode())
                .departmentName(dto.getDepartmentName())
                .description(dto.getDescription())
                .status(dto.getStatus())
                .build();
    }


    // ==========================================
    // Update Department
    // ==========================================

    @Override
    public DepartmentDto updateDepartment(Long id, DepartmentDto departmentDto) {

        Department department = departmentRepository
                .findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Department not found with id: " + id)
                );

        // Check duplicate Department Code
        departmentRepository.findByDepartmentCode(
                        departmentDto.getDepartmentCode())
                .ifPresent(existing -> {
                    if (!existing.getId().equals(id)) {
                        throw new RuntimeException("Department code already exists.");
                    }
                });

        // Check duplicate Department Name
        departmentRepository.findByDepartmentName(
                        departmentDto.getDepartmentName())
                .ifPresent(existing -> {
                    if (!existing.getId().equals(id)) {
                        throw new RuntimeException("Department name already exists.");
                    }
                });

        department.setDepartmentCode(departmentDto.getDepartmentCode());
        department.setDepartmentName(departmentDto.getDepartmentName());
        department.setDescription(departmentDto.getDescription());
        department.setStatus(departmentDto.getStatus());

        Department updatedDepartment =
                departmentRepository.save(department);

        return mapToDto(updatedDepartment);
    }

    // ==========================================
    // Get Department By Id
    // ==========================================

    @Override
    public DepartmentDto getDepartmentById(Long id) {

        Department department = departmentRepository
                .findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Department not found with id: " + id)
                );

        return mapToDto(department);
    }

    // ==========================================
    // Get All Departments
    // ==========================================

    @Override
    public List<DepartmentDto> getAllDepartments() {

        return departmentRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    // ==========================================
    // Delete Department
    // ==========================================

    @Override
    public void deleteDepartment(Long id) {

        Department department = departmentRepository
                .findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException(
                                "Department not found with id: " + id
                        )
                );

        departmentRepository.delete(department);
    }

    // ==========================================
    // Search By Department Name
    // ==========================================

    @Override
    public List<DepartmentDto> searchByDepartmentName(String departmentName) {

        return departmentRepository
                .findByDepartmentNameContainingIgnoreCase(departmentName)
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    // ==========================================
    // Search By Department Code
    // ==========================================

    @Override
    public List<DepartmentDto> searchByDepartmentCode(String departmentCode) {

        return departmentRepository
                .findByDepartmentCodeContainingIgnoreCase(departmentCode)
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    // ==========================================
    // Get Departments By Status
    // ==========================================

    @Override
    public List<DepartmentDto> getDepartmentsByStatus(String status) {

        return departmentRepository
                .findByStatus(status)
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    // ==========================================
    // Entity -> DTO
    // ==========================================

    private DepartmentDto mapToDto(Department department) {

        return DepartmentDto.builder()
                .id(department.getId())
                .departmentCode(department.getDepartmentCode())
                .departmentName(department.getDepartmentName())
                .description(department.getDescription())
                .status(department.getStatus())
                .build();
    }

}

