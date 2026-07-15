package com.clothstore.retail_cloth_store.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "suppliers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Supplier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String supplierName;
    private String contactPerson;
    private String mobile;
    private String email;
    private String gstNumber;
    private String address;
    private String city;
    private String state;
    private String pinCode;
}