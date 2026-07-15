package com.clothstore.retail_cloth_store.service.impl;

import com.clothstore.retail_cloth_store.dto.LeaveDto;
import com.clothstore.retail_cloth_store.entity.Employee;
import com.clothstore.retail_cloth_store.entity.Leave;
import com.clothstore.retail_cloth_store.entity.LeaveStatus;
import com.clothstore.retail_cloth_store.exception.ResourceNotFoundException;
import com.clothstore.retail_cloth_store.mapper.LeaveMapper;
import com.clothstore.retail_cloth_store.repository.EmployeeRepository;
import com.clothstore.retail_cloth_store.repository.LeaveRepository;
import com.clothstore.retail_cloth_store.service.LeaveService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LeaveServiceImpl implements LeaveService {

    private final LeaveRepository leaveRepository;
    private final EmployeeRepository employeeRepository;

    @Override
    public LeaveDto createLeave(LeaveDto leaveDto) {

        Employee employee = employeeRepository.findById(leaveDto.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        Leave leave = new Leave();

        leave.setEmployee(employee);
        leave.setLeaveType(leaveDto.getLeaveType());
        leave.setFromDate(leaveDto.getFromDate());
        leave.setToDate(leaveDto.getToDate());

        long days = ChronoUnit.DAYS.between(
                leaveDto.getFromDate(),
                leaveDto.getToDate()
        ) + 1;

        leave.setTotalDays((int) days);

        leave.setReason(leaveDto.getReason());

        leave.setStatus(LeaveStatus.PENDING);

        Leave savedLeave = leaveRepository.save(leave);

        return mapToDto(savedLeave);
    }

    @Override
    public LeaveDto updateLeave(Long id, LeaveDto leaveDto) {

        Leave leave = leaveRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave not found"));

        Employee employee = employeeRepository.findById(leaveDto.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        leave.setEmployee(employee);
        leave.setLeaveType(leaveDto.getLeaveType());
        leave.setFromDate(leaveDto.getFromDate());
        leave.setToDate(leaveDto.getToDate());

        long days = ChronoUnit.DAYS.between(
                leaveDto.getFromDate(),
                leaveDto.getToDate()
        ) + 1;

        leave.setTotalDays((int) days);

        leave.setReason(leaveDto.getReason());

        Leave updatedLeave = leaveRepository.save(leave);

        return mapToDto(updatedLeave);
    }

    @Override
    public LeaveDto getLeaveById(Long id) {

        Leave leave = leaveRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave not found"));

        return mapToDto(leave);
    }

    @Override
    public List<LeaveDto> getAllLeaves() {

        return leaveRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteLeave(Long id) {

        leaveRepository.deleteById(id);
    }

    @Override
    public List<LeaveDto> getLeavesByEmployee(Long employeeId) {

        return leaveRepository.findByEmployeeId(employeeId)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<LeaveDto> getLeavesByStatus(String status) {

        LeaveStatus leaveStatus =
                LeaveStatus.valueOf(status.toUpperCase());

        return leaveRepository.findByStatus(leaveStatus)
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    

    @Override
    public LeaveDto approveLeave(Long id) {

        Leave leave = leaveRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Leave not found"));

        leave.setStatus(LeaveStatus.APPROVED);

        return LeaveMapper.mapToLeaveDto(
                leaveRepository.save(leave)
        );
    }

    @Override
    public LeaveDto rejectLeave(Long id) {

        Leave leave = leaveRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Leave not found"));

        leave.setStatus(LeaveStatus.REJECTED);

        return LeaveMapper.mapToLeaveDto(
                leaveRepository.save(leave)
        );
    }
    private LeaveDto mapToDto(Leave leave) {

        LeaveDto dto = new LeaveDto();

        dto.setId(leave.getId());

        dto.setEmployeeId(leave.getEmployee().getId());

        dto.setEmployeeCode(leave.getEmployee().getEmployeeCode());

        dto.setEmployeeName(
                leave.getEmployee().getFirstName()
                        + " "
                        + leave.getEmployee().getLastName()
        );

        dto.setLeaveType(leave.getLeaveType());

        dto.setFromDate(leave.getFromDate());

        dto.setToDate(leave.getToDate());

        dto.setTotalDays(leave.getTotalDays());

        dto.setReason(leave.getReason());

        dto.setStatus(String.valueOf(LeaveStatus.PENDING));

        return dto;
    }
}