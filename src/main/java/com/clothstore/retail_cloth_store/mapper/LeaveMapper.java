package com.clothstore.retail_cloth_store.mapper;

import com.clothstore.retail_cloth_store.dto.LeaveDto;
import com.clothstore.retail_cloth_store.entity.Leave;

public class LeaveMapper {

    public static LeaveDto mapToLeaveDto(Leave leave) {

        LeaveDto dto = new LeaveDto();

        dto.setId(leave.getId());

        dto.setEmployeeId(leave.getEmployee().getId());

        dto.setEmployeeCode(
                leave.getEmployee().getEmployeeCode()
        );

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

        dto.setStatus(leave.getStatus().name());

        return dto;
    }

    public static Leave mapToLeaveEntity(LeaveDto dto) {

        Leave leave = new Leave();

        leave.setId(dto.getId());

        leave.setLeaveType(dto.getLeaveType());

        leave.setFromDate(dto.getFromDate());

        leave.setToDate(dto.getToDate());

        leave.setTotalDays(dto.getTotalDays());

        leave.setReason(dto.getReason());

        return leave;
    }

}