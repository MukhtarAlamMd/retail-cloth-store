package com.clothstore.retail_cloth_store.repository;

import com.clothstore.retail_cloth_store.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {

    // Search by Department Name (Exact Match)
    Optional<Department> findByDepartmentName(String departmentName);

    // Search by Department Code (Exact Match)
    Optional<Department> findByDepartmentCode(String departmentCode);

    // Search by Department Name (Containing, Ignore Case)
    List<Department> findByDepartmentNameContainingIgnoreCase(String departmentName);

    // Search by Department Code (Containing, Ignore Case)
    List<Department> findByDepartmentCodeContainingIgnoreCase(String departmentCode);

    // Filter by Status
    List<Department> findByStatus(String status);

    // Duplicate Validation
    boolean existsByDepartmentCode(String departmentCode);

    boolean existsByDepartmentName(String departmentName);

}