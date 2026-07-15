package com.clothstore.retail_cloth_store.controller;

import com.clothstore.retail_cloth_store.dto.LeaveDto;
import com.clothstore.retail_cloth_store.service.LeaveService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaves")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class LeaveController {

    private final LeaveService leaveService;

    // Create Leave
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public LeaveDto createLeave(@Valid @RequestBody LeaveDto leaveDto) {

        return leaveService.createLeave(leaveDto);
    }

    // Get Leave By Id
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public LeaveDto getLeaveById(@PathVariable Long id) {

        return leaveService.getLeaveById(id);
    }

    // Get All Leaves
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<LeaveDto> getAllLeaves() {

        return leaveService.getAllLeaves();
    }

    // Update Leave
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public LeaveDto updateLeave(
            @PathVariable Long id,
            @Valid @RequestBody LeaveDto leaveDto
    ) {

        return leaveService.updateLeave(id, leaveDto);
    }

    // Delete Leave
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteLeave(@PathVariable Long id) {

        leaveService.deleteLeave(id);
    }

    // Get Employee Leave History
    @GetMapping("/employee/{employeeId}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<LeaveDto> getLeavesByEmployee(
            @PathVariable Long employeeId
    ) {

        return leaveService.getLeavesByEmployee(employeeId);
    }

    // Get Leave By Status
    @GetMapping("/status/{status}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<LeaveDto> getLeavesByStatus(
            @PathVariable String status
    ) {

        return leaveService.getLeavesByStatus(status);
    }

    // Approve Leave
    @PutMapping("/{id}/approve")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public LeaveDto approveLeave(
            @PathVariable Long id
    ) {

        return leaveService.approveLeave(id);
    }

    // Reject Leave
    @PutMapping("/{id}/reject")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public LeaveDto rejectLeave(
            @PathVariable Long id
    ) {

        return leaveService.rejectLeave(id);
    }

}