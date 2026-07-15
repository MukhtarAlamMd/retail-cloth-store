package com.clothstore.retail_cloth_store.service;

import com.clothstore.retail_cloth_store.dto.DesignationDto;

import java.util.List;

public interface DesignationService {

    // ==========================
    // Create Designation
    // ==========================

    DesignationDto createDesignation(DesignationDto designationDto);

    // ==========================
    // Update Designation
    // ==========================

    DesignationDto updateDesignation(Long id, DesignationDto designationDto);

    // ==========================
    // Get Designation By Id
    // ==========================

    DesignationDto getDesignationById(Long id);

    // ==========================
    // Get All Designations
    // ==========================

    List<DesignationDto> getAllDesignations();

    // ==========================
    // Delete Designation
    // ==========================

    void deleteDesignation(Long id);

    // ==========================
    // Search By Designation Name
    // ==========================

    List<DesignationDto> searchByDesignationName(String keyword);

    // ==========================
    // Search By Designation Code
    // ==========================

    List<DesignationDto> searchByDesignationCode(String keyword);

    // ==========================
    // Filter By Status
    // ==========================

    List<DesignationDto> getDesignationsByStatus(String status);

    // ==========================
    // Filter By Department
    // ==========================

    List<DesignationDto> getDesignationsByDepartment(Long departmentId);

}