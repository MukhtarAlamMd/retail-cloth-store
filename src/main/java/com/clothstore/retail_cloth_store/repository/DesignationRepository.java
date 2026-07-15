package com.clothstore.retail_cloth_store.repository;

import com.clothstore.retail_cloth_store.entity.Designation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DesignationRepository extends JpaRepository<Designation, Long> {

    // ==========================
    // Duplicate Validation
    // ==========================

    boolean existsByDesignationCode(String designationCode);

    boolean existsByDesignationNameAndDepartmentId(
            String designationName,
            Long departmentId
    );

    // ==========================
    // Search By Designation Name
    // ==========================

    List<Designation> findByDesignationNameContainingIgnoreCase(String keyword);

    // ==========================
    // Search By Designation Code
    // ==========================

    List<Designation> findByDesignationCodeContainingIgnoreCase(String keyword);

    // ==========================
    // Filter By Status
    // ==========================

    List<Designation> findByStatus(String status);

    // ==========================
    // Filter By Department
    // ==========================

    List<Designation> findByDepartmentId(Long departmentId);

    // ==========================
    // Search By Department Name
    // ==========================

    List<Designation> findByDepartmentDepartmentNameContainingIgnoreCase(String departmentName);

    // ==========================
    // Find By Exact Designation Code
    // ==========================

    Optional<Designation> findByDesignationCode(String designationCode);

}