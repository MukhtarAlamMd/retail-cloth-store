package com.clothstore.retail_cloth_store.mapper;

import com.clothstore.retail_cloth_store.dto.DesignationDto;
import com.clothstore.retail_cloth_store.entity.Department;
import com.clothstore.retail_cloth_store.entity.Designation;

public class DesignationMapper {

    // Entity -> DTO
    public static DesignationDto mapToDesignationDto(Designation designation) {

        if (designation == null) {
            return null;
        }

        DesignationDto dto = new DesignationDto();

        dto.setId(designation.getId());
        dto.setDesignationCode(designation.getDesignationCode());
        dto.setDesignationName(designation.getDesignationName());
        dto.setDescription(designation.getDescription());
        dto.setStatus(designation.getStatus());

        if (designation.getDepartment() != null) {

            dto.setDepartmentId(designation.getDepartment().getId());
            dto.setDepartmentCode(designation.getDepartment().getDepartmentCode());
            dto.setDepartmentName(designation.getDepartment().getDepartmentName());

        }

        return dto;
    }

    // DTO -> Entity
    public static Designation mapToDesignation(DesignationDto dto) {

        if (dto == null) {
            return null;
        }

        Designation designation = new Designation();

        designation.setId(dto.getId());
        designation.setDesignationCode(dto.getDesignationCode());
        designation.setDesignationName(dto.getDesignationName());
        designation.setDescription(dto.getDescription());
        designation.setStatus(dto.getStatus());

        if (dto.getDepartmentId() != null) {

            Department department = new Department();
            department.setId(dto.getDepartmentId());

            designation.setDepartment(department);
        }

        return designation;
    }

}