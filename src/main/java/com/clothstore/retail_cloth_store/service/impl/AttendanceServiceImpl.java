package com.clothstore.retail_cloth_store.service.impl;

import com.clothstore.retail_cloth_store.dto.AttendanceDto;
import com.clothstore.retail_cloth_store.entity.Attendance;
import com.clothstore.retail_cloth_store.entity.Employee;
import com.clothstore.retail_cloth_store.repository.AttendanceRepository;
import com.clothstore.retail_cloth_store.repository.EmployeeRepository;
import com.clothstore.retail_cloth_store.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AttendanceServiceImpl implements AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final EmployeeRepository employeeRepository;

    @Override
    public AttendanceDto createAttendance(AttendanceDto attendanceDto) {

        boolean exists = attendanceRepository.existsByEmployeeIdAndAttendanceDate(
                attendanceDto.getEmployeeId(),
                attendanceDto.getAttendanceDate());

        if (exists) {
            throw new RuntimeException("Attendance already marked for this employee.");
        }

        Attendance attendance = mapToEntity(attendanceDto);

        Attendance savedAttendance = attendanceRepository.save(attendance);

        return mapToDto(savedAttendance);
    }

    @Override
    public AttendanceDto updateAttendance(Long id, AttendanceDto attendanceDto) {

        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Attendance not found"));

        attendanceRepository
                .findByEmployeeIdAndAttendanceDate(
                        attendanceDto.getEmployeeId(),
                        attendanceDto.getAttendanceDate())
                .ifPresent(existing -> {
                    if (!existing.getId().equals(id)) {
                        throw new RuntimeException(
                                "Attendance already marked for this employee.");
                    }
                });

        Employee employee = employeeRepository.findById(attendanceDto.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        attendance.setEmployee(employee);
        attendance.setAttendanceDate(attendanceDto.getAttendanceDate());
        attendance.setStatus(attendanceDto.getStatus());
        attendance.setCheckInTime(attendanceDto.getCheckInTime());
        attendance.setCheckOutTime(attendanceDto.getCheckOutTime());
        attendance.setRemarks(attendanceDto.getRemarks());

        Attendance updatedAttendance = attendanceRepository.save(attendance);

        return mapToDto(updatedAttendance);
    }

    @Override
    public void deleteAttendance(Long id) {

        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Attendance not found"));

        attendanceRepository.delete(attendance);
    }

    @Override
    public AttendanceDto getAttendanceById(Long id) {

        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Attendance not found"));

        return mapToDto(attendance);
    }

    @Override
    public List<AttendanceDto> getAllAttendance() {

        return attendanceRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<AttendanceDto> getAttendanceByEmployee(Long employeeId) {

        return attendanceRepository.findByEmployeeId(employeeId)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<AttendanceDto> getAttendanceByDate(LocalDate attendanceDate) {

        return attendanceRepository.findByAttendanceDate(attendanceDate)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<AttendanceDto> getAttendanceBetweenDates(LocalDate startDate,
                                                         LocalDate endDate) {

        return attendanceRepository.findByAttendanceDateBetween(startDate, endDate)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<AttendanceDto> getAttendanceByStatus(String status) {

        return attendanceRepository.findByStatus(status)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public long getPresentCount() {

        return attendanceRepository.countByStatus("Present");
    }

    @Override
    public long getEmployeeAttendanceCount(Long employeeId) {

        return attendanceRepository.countByEmployeeId(employeeId);
    }

    @Override
    public List<AttendanceDto> getEmployeeAttendanceBetweenDates(
            Long employeeId,
            LocalDate startDate,
            LocalDate endDate) {

        return attendanceRepository
                .findByEmployeeIdAndAttendanceDateBetween(
                        employeeId,
                        startDate,
                        endDate)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    // ============================
    // DTO -> Entity
    // ============================

    private Attendance mapToEntity(AttendanceDto dto) {

        Employee employee = employeeRepository.findById(dto.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        return Attendance.builder()
                .id(dto.getId())
                .employee(employee)
                .attendanceDate(dto.getAttendanceDate())
                .status(dto.getStatus())
                .checkInTime(dto.getCheckInTime())
                .checkOutTime(dto.getCheckOutTime())
                .remarks(dto.getRemarks())
                .build();
    }

    // ============================
    // Entity -> DTO
    // ============================

    private AttendanceDto mapToDto(Attendance attendance) {

        Employee employee = attendance.getEmployee();

        return AttendanceDto.builder()
                .id(attendance.getId())
                .employeeId(employee.getId())
                .employeeCode(employee.getEmployeeCode())
                .employeeName(employee.getFirstName() + " " + employee.getLastName())
                .attendanceDate(attendance.getAttendanceDate())
                .status(attendance.getStatus())
                .checkInTime(attendance.getCheckInTime())
                .checkOutTime(attendance.getCheckOutTime())
                .remarks(attendance.getRemarks())
                .build();
    }
}