package com.clothstore.retail_cloth_store.controller;

import com.clothstore.retail_cloth_store.dto.AttendanceDto;
import com.clothstore.retail_cloth_store.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AttendanceController {

    private final AttendanceService attendanceService;

    // ==========================================
    // Create Attendance
    // ==========================================

    @PostMapping
    public ResponseEntity<AttendanceDto> createAttendance(
            @RequestBody AttendanceDto attendanceDto) {

        AttendanceDto savedAttendance =
                attendanceService.createAttendance(attendanceDto);

        return new ResponseEntity<>(
                savedAttendance,
                HttpStatus.CREATED);
    }

    // ==========================================
    // Update Attendance
    // ==========================================

    @PutMapping("/{id}")
    public ResponseEntity<AttendanceDto> updateAttendance(
            @PathVariable Long id,
            @RequestBody AttendanceDto attendanceDto) {

        AttendanceDto updatedAttendance =
                attendanceService.updateAttendance(id, attendanceDto);

        return ResponseEntity.ok(updatedAttendance);
    }

    // ==========================================
    // Get Attendance By Id
    // ==========================================

    @GetMapping("/{id}")
    public ResponseEntity<AttendanceDto> getAttendanceById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                attendanceService.getAttendanceById(id));
    }

    // ==========================================
    // Get All Attendance
    // ==========================================

    @GetMapping
    public ResponseEntity<List<AttendanceDto>> getAllAttendance() {

        return ResponseEntity.ok(
                attendanceService.getAllAttendance());
    }

    // ==========================================
    // Delete Attendance
    // ==========================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAttendance(
            @PathVariable Long id) {

        attendanceService.deleteAttendance(id);

        return ResponseEntity.ok(
                "Attendance deleted successfully.");
    }

    // ==========================================
    // Get Attendance By Employee
    // ==========================================

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<AttendanceDto>>
    getAttendanceByEmployee(
            @PathVariable Long employeeId) {

        return ResponseEntity.ok(
                attendanceService.getAttendanceByEmployee(employeeId));
    }

    // ==========================================
    // Get Attendance By Date
    // ==========================================

    @GetMapping("/date/{attendanceDate}")
    public ResponseEntity<List<AttendanceDto>>
    getAttendanceByDate(

            @PathVariable
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate attendanceDate) {

        return ResponseEntity.ok(
                attendanceService.getAttendanceByDate(attendanceDate));
    }

    // ==========================================
    // Get Attendance By Status
    // ==========================================

    @GetMapping("/status/{status}")
    public ResponseEntity<List<AttendanceDto>>
    getAttendanceByStatus(
            @PathVariable String status) {

        return ResponseEntity.ok(
                attendanceService.getAttendanceByStatus(status));
    }

    // ==========================================
    // Attendance Between Dates
    // ==========================================

    @GetMapping("/between")
    public ResponseEntity<List<AttendanceDto>>
    getAttendanceBetweenDates(

            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate startDate,

            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate endDate) {

        return ResponseEntity.ok(
                attendanceService.getAttendanceBetweenDates(
                        startDate,
                        endDate));
    }

    // ==========================================
    // Employee Attendance Between Dates
    // ==========================================

    @GetMapping("/employee-between")
    public ResponseEntity<List<AttendanceDto>>
    getEmployeeAttendanceBetweenDates(

            @RequestParam Long employeeId,

            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate startDate,

            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate endDate) {

        return ResponseEntity.ok(
                attendanceService
                        .getEmployeeAttendanceBetweenDates(
                                employeeId,
                                startDate,
                                endDate));
    }

    // ==========================================
    // Present Count
    // ==========================================

    @GetMapping("/present-count")
    public ResponseEntity<Long> getPresentCount() {

        return ResponseEntity.ok(
                attendanceService.getPresentCount());
    }

    // ==========================================
    // Employee Attendance Count
    // ==========================================

    @GetMapping("/count/{employeeId}")
    public ResponseEntity<Long> getEmployeeAttendanceCount(
            @PathVariable Long employeeId) {

        return ResponseEntity.ok(
                attendanceService
                        .getEmployeeAttendanceCount(employeeId));
    }

}