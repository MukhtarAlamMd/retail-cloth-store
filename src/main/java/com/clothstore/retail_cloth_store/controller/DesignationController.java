package com.clothstore.retail_cloth_store.controller;

import com.clothstore.retail_cloth_store.dto.DesignationDto;
import com.clothstore.retail_cloth_store.service.DesignationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/designations")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class DesignationController {

    private final DesignationService designationService;

    // ==========================================
    // Create Designation
    // ==========================================

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    public DesignationDto createDesignation(
            @Valid @RequestBody DesignationDto designationDto) {

        return designationService.createDesignation(designationDto);
    }

    // ==========================================
    // Update Designation
    // ==========================================

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    public DesignationDto updateDesignation(
            @PathVariable Long id,
            @Valid @RequestBody DesignationDto designationDto) {

        return designationService.updateDesignation(id, designationDto);
    }

    // ==========================================
    // Get Designation By Id
    // ==========================================

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','HR','EMPLOYEE')")
    public DesignationDto getDesignationById(
            @PathVariable Long id) {

        return designationService.getDesignationById(id);
    }

    // ==========================================
    // Get All Designations
    // ==========================================

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','HR','EMPLOYEE')")
    public List<DesignationDto> getAllDesignations() {

        return designationService.getAllDesignations();
    }

    // ==========================================
    // Delete Designation
    // ==========================================

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteDesignation(
            @PathVariable Long id) {

        designationService.deleteDesignation(id);

        return "Designation deleted successfully.";
    }

    // ==========================================
    // Search By Designation Name
    // ==========================================

    @GetMapping("/search/name")
    @PreAuthorize("hasAnyRole('ADMIN','HR','EMPLOYEE')")
    public List<DesignationDto> searchByDesignationName(
            @RequestParam String keyword) {

        return designationService.searchByDesignationName(keyword);
    }

    // ==========================================
    // Search By Designation Code
    // ==========================================

    @GetMapping("/search/code")
    @PreAuthorize("hasAnyRole('ADMIN','HR','EMPLOYEE')")
    public List<DesignationDto> searchByDesignationCode(
            @RequestParam String keyword) {

        return designationService.searchByDesignationCode(keyword);
    }

    // ==========================================
    // Filter By Status
    // ==========================================

    @GetMapping("/status/{status}")
    @PreAuthorize("hasAnyRole('ADMIN','HR','EMPLOYEE')")
    public List<DesignationDto> getByStatus(
            @PathVariable String status) {

        return designationService.getDesignationsByStatus(status);
    }

    // ==========================================
    // Filter By Department
    // ==========================================

    @GetMapping("/department/{departmentId}")
    @PreAuthorize("hasAnyRole('ADMIN','HR','EMPLOYEE')")
    public List<DesignationDto> getByDepartment(
            @PathVariable Long departmentId) {

        return designationService.getDesignationsByDepartment(departmentId);
    }

}