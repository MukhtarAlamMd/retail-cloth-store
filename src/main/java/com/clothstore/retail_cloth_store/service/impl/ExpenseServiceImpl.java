package com.clothstore.retail_cloth_store.service.impl;

import com.clothstore.retail_cloth_store.dto.ExpenseDto;
import com.clothstore.retail_cloth_store.entity.Expense;
import com.clothstore.retail_cloth_store.exception.ResourceNotFoundException;
import com.clothstore.retail_cloth_store.mapper.ExpenseMapper;
import com.clothstore.retail_cloth_store.repository.ExpenseRepository;
import com.clothstore.retail_cloth_store.service.ExpenseService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ExpenseServiceImpl implements ExpenseService {

    private final ExpenseRepository expenseRepository;

    @Override
    public ExpenseDto createExpense(ExpenseDto dto) {

        Expense expense = ExpenseMapper.mapToEntity(dto);

        Expense savedExpense = expenseRepository.save(expense);

        return ExpenseMapper.mapToDto(savedExpense);
    }

    @Override
    public ExpenseDto updateExpense(Long id, ExpenseDto dto) {

        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Expense not found with id : " + id));

        expense.setExpenseName(dto.getExpenseName());
        expense.setCategory(dto.getCategory());
        expense.setAmount(dto.getAmount());
        expense.setDescription(dto.getDescription());
        expense.setExpenseDate(dto.getExpenseDate());

        Expense updatedExpense = expenseRepository.save(expense);

        return ExpenseMapper.mapToDto(updatedExpense);
    }

    @Override
    public ExpenseDto getExpenseById(Long id) {

        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Expense not found with id : " + id));

        return ExpenseMapper.mapToDto(expense);
    }

    @Override
    public List<ExpenseDto> getAllExpenses() {

        return expenseRepository.findAll()
                .stream()
                .map(ExpenseMapper::mapToDto)
                .toList();
    }

    @Override
    public void deleteExpense(Long id) {

        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Expense not found with id : " + id));

        expenseRepository.delete(expense);
    }
}