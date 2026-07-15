package com.clothstore.retail_cloth_store.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ExpenseDto {

    private Long id;

    private String expenseName;

    private String category;

    private Double amount;

    private String description;

    private LocalDate expenseDate;
}