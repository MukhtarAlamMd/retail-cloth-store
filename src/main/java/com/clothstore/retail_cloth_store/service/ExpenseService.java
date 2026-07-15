package com.clothstore.retail_cloth_store.service;

import com.clothstore.retail_cloth_store.dto.ExpenseDto;

import java.util.List;

public interface ExpenseService {

    ExpenseDto createExpense(ExpenseDto dto);

    ExpenseDto updateExpense(Long id, ExpenseDto dto);

    ExpenseDto getExpenseById(Long id);

    List<ExpenseDto> getAllExpenses();

    void deleteExpense(Long id);
}