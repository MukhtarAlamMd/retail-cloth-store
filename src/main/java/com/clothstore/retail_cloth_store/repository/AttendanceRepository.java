package com.clothstore.retail_cloth_store.repository;

import com.clothstore.retail_cloth_store.entity.Attendance;
import com.clothstore.retail_cloth_store.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    // ==========================================
    // Find by Employee
    // ==========================================

    List<Attendance> findByEmployee(Employee employee);

    // ==========================================
    // Find by Employee Id
    // ==========================================

    List<Attendance> findByEmployeeId(Long employeeId);

    // ==========================================
    // Find by Date
    // ==========================================

    List<Attendance> findByAttendanceDate(LocalDate attendanceDate);

    // ==========================================
    // Find by Status
    // ==========================================

    List<Attendance> findByStatus(String status);

    // ==========================================
    // Find Employee Attendance Between Dates
    // ==========================================

    List<Attendance> findByEmployeeIdAndAttendanceDateBetween(
            Long employeeId,
            LocalDate startDate,
            LocalDate endDate
    );

    // ==========================================
    // Find Attendance Between Dates
    // ==========================================

    List<Attendance> findByAttendanceDateBetween(
            LocalDate startDate,
            LocalDate endDate
    );

    // ==========================================
    // Check Duplicate Attendance
    // ==========================================

    Optional<Attendance> findByEmployeeIdAndAttendanceDate(
            Long employeeId,
            LocalDate attendanceDate
    );

    // ==========================================
    // Exists Attendance
    // ==========================================

    boolean existsByEmployeeIdAndAttendanceDate(
            Long employeeId,
            LocalDate attendanceDate
    );

    // ==========================================
    // Count Present
    // ==========================================

    long countByStatus(String status);

    // ==========================================
    // Count Employee Attendance
    // ==========================================

    long countByEmployeeId(Long employeeId);

}