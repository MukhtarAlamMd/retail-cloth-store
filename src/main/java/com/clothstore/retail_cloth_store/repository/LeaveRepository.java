package com.clothstore.retail_cloth_store.repository;

import com.clothstore.retail_cloth_store.entity.Leave;
import com.clothstore.retail_cloth_store.entity.LeaveStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeaveRepository extends JpaRepository<Leave, Long> {

    // Find all leave requests of an employee
    List<Leave> findByEmployeeId(Long employeeId);

    // Find leave requests by status
    List<Leave> findByStatus(LeaveStatus status);

    // Find leave requests by leave type
    List<Leave> findByLeaveType(String leaveType);

    // Find leave requests by employee and status
    List<Leave> findByEmployeeIdAndStatus(Long employeeId, String status);

}