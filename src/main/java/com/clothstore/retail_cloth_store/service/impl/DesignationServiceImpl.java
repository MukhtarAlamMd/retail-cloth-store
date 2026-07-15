package com.clothstore.retail_cloth_store.service.impl;

import com.clothstore.retail_cloth_store.dto.DesignationDto;
import com.clothstore.retail_cloth_store.entity.Department;
import com.clothstore.retail_cloth_store.entity.Designation;
import com.clothstore.retail_cloth_store.exception.DuplicateResourceException;
import com.clothstore.retail_cloth_store.exception.ResourceNotFoundException;
import com.clothstore.retail_cloth_store.mapper.DesignationMapper;
import com.clothstore.retail_cloth_store.repository.DepartmentRepository;
import com.clothstore.retail_cloth_store.repository.DesignationRepository;
import com.clothstore.retail_cloth_store.service.DesignationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DesignationServiceImpl implements DesignationService {

    private final DesignationRepository designationRepository;

    private final DepartmentRepository departmentRepository;

    // ==========================================
    // Create Designation
    // ==========================================

    @Override
    public DesignationDto createDesignation(DesignationDto designationDto) {

        if (designationRepository.existsByDesignationCode(
                designationDto.getDesignationCode())) {

            throw new DuplicateResourceException("Designation Code already exists.");
        }

        if (designationRepository.existsByDesignationNameAndDepartmentId(
                designationDto.getDesignationName(),
                designationDto.getDepartmentId())) {

            throw new DuplicateResourceException(
                    "Designation already exists in this department.");
        }

        Department department = departmentRepository.findById(
                designationDto.getDepartmentId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Department not found with id : "
                                        + designationDto.getDepartmentId()));

        Designation designation =
                DesignationMapper.mapToDesignation(designationDto);

        designation.setDepartment(department);

        Designation savedDesignation =
                designationRepository.save(designation);

        return DesignationMapper.mapToDesignationDto(savedDesignation);
    }

    // ==========================================
    // Update Designation
    // ==========================================

    @Override
    public DesignationDto updateDesignation(
            Long id,
            DesignationDto designationDto) {

        Designation designation = designationRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Designation not found with id : " + id));

        Department department = departmentRepository.findById(
                designationDto.getDepartmentId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Department not found with id : "
                                        + designationDto.getDepartmentId()));

        designation.setDesignationCode(
                designationDto.getDesignationCode());

        designation.setDesignationName(
                designationDto.getDesignationName());

        designation.setDescription(
                designationDto.getDescription());

        designation.setStatus(
                designationDto.getStatus());

        designation.setDepartment(department);

        Designation updatedDesignation =
                designationRepository.save(designation);

        return DesignationMapper.mapToDesignationDto(updatedDesignation);
    }

    // ==========================================
    // Get By Id
    // ==========================================

    @Override
    public DesignationDto getDesignationById(Long id) {

        Designation designation =
                designationRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Designation not found with id : " + id));

        return DesignationMapper.mapToDesignationDto(designation);
    }

    // ==========================================
    // Get All
    // ==========================================

    @Override
    public List<DesignationDto> getAllDesignations() {

        return designationRepository.findAll()
                .stream()
                .map(DesignationMapper::mapToDesignationDto)
                .collect(Collectors.toList());
    }

    // ==========================================
    // Delete
    // ==========================================

    @Override
    public void deleteDesignation(Long id) {

        Designation designation =
                designationRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Designation not found with id : " + id));

        designationRepository.delete(designation);
    }

    // ==========================================
    // Search By Name
    // ==========================================

    @Override
    public List<DesignationDto> searchByDesignationName(
            String keyword) {

        return designationRepository
                .findByDesignationNameContainingIgnoreCase(keyword)
                .stream()
                .map(DesignationMapper::mapToDesignationDto)
                .collect(Collectors.toList());
    }

    // ==========================================
    // Search By Code
    // ==========================================

    @Override
    public List<DesignationDto> searchByDesignationCode(
            String keyword) {

        return designationRepository
                .findByDesignationCodeContainingIgnoreCase(keyword)
                .stream()
                .map(DesignationMapper::mapToDesignationDto)
                .collect(Collectors.toList());
    }

    // ==========================================
    // Filter By Status
    // ==========================================

    @Override
    public List<DesignationDto> getDesignationsByStatus(
            String status) {

        return designationRepository.findByStatus(status)
                .stream()
                .map(DesignationMapper::mapToDesignationDto)
                .collect(Collectors.toList());
    }

    // ==========================================
    // Filter By Department
    // ==========================================

    @Override
    public List<DesignationDto> getDesignationsByDepartment(
            Long departmentId) {

        return designationRepository.findByDepartmentId(departmentId)
                .stream()
                .map(DesignationMapper::mapToDesignationDto)
                .collect(Collectors.toList());
    }
}