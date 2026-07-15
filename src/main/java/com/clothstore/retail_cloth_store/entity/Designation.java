package com.clothstore.retail_cloth_store.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Table(
        name = "designations",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "designation_code"),
                @UniqueConstraint(columnNames = {"designation_name", "department_id"})
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Designation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Designation code is required")
    @Size(max = 20)
    @Column(name = "designation_code", nullable = false, length = 20)
    private String designationCode;

    @NotBlank(message = "Designation name is required")
    @Size(max = 100)
    @Column(name = "designation_name", nullable = false, length = 100)
    private String designationName;

    @Size(max = 500)
    @Column(length = 500)
    private String description;

    @Column(nullable = false, length = 20)
    private String status = "Active";

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;
}