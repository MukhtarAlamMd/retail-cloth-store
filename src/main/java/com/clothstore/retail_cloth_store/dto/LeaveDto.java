package com.clothstore.retail_cloth_store.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeaveDto {

    private Long id;

    private Long employeeId;

    private String employeeCode;

    private String employeeName;

    private String leaveType;

    private LocalDate fromDate;

    private LocalDate toDate;

    private Integer totalDays;

    private String reason;

    private String status;
}