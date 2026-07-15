package com.clothstore.retail_cloth_store.service;

import com.clothstore.retail_cloth_store.dto.LeaveDto;

import java.util.List;

public interface LeaveService {



    // Create Leave
    LeaveDto createLeave(LeaveDto leaveDto);

    // Update Leave
    LeaveDto updateLeave(Long id, LeaveDto leaveDto);

    // Get Leave By Id
    LeaveDto getLeaveById(Long id);

    // Get All Leave Requests
    List<LeaveDto> getAllLeaves();

    // Delete Leave
    void deleteLeave(Long id);

    // Employee Leave History
    List<LeaveDto> getLeavesByEmployee(Long employeeId);

    // Get Leave By Status
    List<LeaveDto> getLeavesByStatus(String status);

    // Approve Leave
    LeaveDto approveLeave(Long id);

    // Reject Leave
    LeaveDto rejectLeave(Long id);
}