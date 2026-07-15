package com.clothstore.retail_cloth_store.mapper;

import com.clothstore.retail_cloth_store.dto.ExpenseDto;
import com.clothstore.retail_cloth_store.entity.Expense;

public class ExpenseMapper {

    // ===========================
    // ENTITY -> DTO
    // ===========================
    public static ExpenseDto mapToDto(Expense expense) {

        ExpenseDto dto = new ExpenseDto();

        dto.setId(expense.getId());
        dto.setExpenseName(expense.getExpenseName());
        dto.setCategory(expense.getCategory());
        dto.setAmount(expense.getAmount());
        dto.setDescription(expense.getDescription());
        dto.setExpenseDate(expense.getExpenseDate());

        return dto;
    }

    // ===========================
    // DTO -> ENTITY
    // ===========================
    public static Expense mapToEntity(ExpenseDto dto) {

        Expense expense = new Expense();

        expense.setId(dto.getId());
        expense.setExpenseName(dto.getExpenseName());
        expense.setCategory(dto.getCategory());
        expense.setAmount(dto.getAmount());
        expense.setDescription(dto.getDescription());
        expense.setExpenseDate(dto.getExpenseDate());

        return expense;
    }
}