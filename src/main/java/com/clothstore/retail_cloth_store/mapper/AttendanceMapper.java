package com.clothstore.retail_cloth_store.mapper;

import com.clothstore.retail_cloth_store.dto.AttendanceDto;
import com.clothstore.retail_cloth_store.entity.Attendance;
import org.springframework.stereotype.Component;

import java.time.LocalTime;

@Component
public class AttendanceMapper {

    public AttendanceDto toDto(Attendance attendance) {

        if (attendance == null) {
            return null;
        }

        AttendanceDto dto = new AttendanceDto();

        dto.setId(attendance.getId());

        if (attendance.getEmployee() != null) {

            dto.setEmployeeId(attendance.getEmployee().getId());

            dto.setEmployeeName(
                    attendance.getEmployee().getFirstName()
                            + " "
                            + attendance.getEmployee().getLastName()
            );
        }

        dto.setAttendanceDate(
                attendance.getAttendanceDate()
        );

        dto.setStatus(
                attendance.getStatus()
        );

        dto.setCheckInTime(
                LocalTime.parse(String.valueOf(attendance.getCheckInTime()))
        );

        dto.setCheckOutTime(
                LocalTime.parse(String.valueOf(attendance.getCheckOutTime()))
        );

        dto.setRemarks(
                attendance.getRemarks()
        );

        return dto;
    }

    public Attendance toEntity(AttendanceDto dto) {

        if (dto == null) {
            return null;
        }

        Attendance attendance = new Attendance();

        attendance.setId(dto.getId());

        attendance.setAttendanceDate(
                dto.getAttendanceDate()
        );

        attendance.setStatus(
                dto.getStatus()
        );

        attendance.setCheckInTime(dto.getCheckInTime()
        );

        attendance.setCheckOutTime(dto.getCheckOutTime()
        );

        attendance.setRemarks(
                dto.getRemarks()
        );

        return attendance;
    }
}