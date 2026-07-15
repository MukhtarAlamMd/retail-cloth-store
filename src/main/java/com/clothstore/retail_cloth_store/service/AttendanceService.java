package com.clothstore.retail_cloth_store.service;

import com.clothstore.retail_cloth_store.dto.AttendanceDto;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceService {

    // ==========================================
    // Create Attendance
    // ==========================================

    AttendanceDto createAttendance(
            AttendanceDto attendanceDto
    );

    // ==========================================
    // Update Attendance
    // ==========================================

    AttendanceDto updateAttendance(
            Long id,
            AttendanceDto attendanceDto
    );

    // ==========================================
    // Get Attendance By Id
    // ==========================================

    AttendanceDto getAttendanceById(
            Long id
    );

    // ==========================================
    // Get All Attendance
    // ==========================================

    List<AttendanceDto> getAllAttendance();

    // ==========================================
    // Delete Attendance
    // ==========================================

    void deleteAttendance(
            Long id
    );

    // ==========================================
    // Employee Attendance
    // ==========================================

    List<AttendanceDto> getAttendanceByEmployee(
            Long employeeId
    );

    // ==========================================
    // Attendance By Date
    // ==========================================

    List<AttendanceDto> getAttendanceByDate(
            LocalDate attendanceDate
    );

    // ==========================================
    // Attendance By Status
    // ==========================================

    List<AttendanceDto> getAttendanceByStatus(
            String status
    );

    // ==========================================
    // Attendance Between Dates
    // ==========================================

    List<AttendanceDto> getAttendanceBetweenDates(
            LocalDate startDate,
            LocalDate endDate
    );

    // ==========================================
    // Employee Attendance Between Dates
    // ==========================================

    List<AttendanceDto> getEmployeeAttendanceBetweenDates(
            Long employeeId,
            LocalDate startDate,
            LocalDate endDate
    );

    // ==========================================
    // Present Count
    // ==========================================

    long getPresentCount();

    // ==========================================
    // Employee Attendance Count
    // ==========================================

    long getEmployeeAttendanceCount(
            Long employeeId
    );

}