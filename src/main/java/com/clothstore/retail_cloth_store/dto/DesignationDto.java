package com.clothstore.retail_cloth_store.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DesignationDto {

    private Long id;

    @NotBlank(message = "Designation code is required")
    @Size(max = 20, message = "Designation code cannot exceed 20 characters")
    private String designationCode;

    @NotBlank(message = "Designation name is required")
    @Size(max = 100, message = "Designation name cannot exceed 100 characters")
    private String designationName;

    @Size(max = 500, message = "Description cannot exceed 500 characters")
    private String description;

    @NotBlank(message = "Status is required")
    private String status;

    // Department Mapping
    private Long departmentId;

    private String departmentCode;

    private String departmentName;
}