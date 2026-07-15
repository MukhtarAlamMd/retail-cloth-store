package com.clothstore.retail_cloth_store.controller;

import com.clothstore.retail_cloth_store.dto.ExpenseDto;
import com.clothstore.retail_cloth_store.service.ExpenseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
@CrossOrigin(
        origins = "http://localhost:3000")


public class ExpenseController {

    private final ExpenseService expenseService;

    // ==========================
    // Create Expense
    // ==========================
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public ExpenseDto createExpense(
            @Valid @RequestBody ExpenseDto expenseDto) {

        return expenseService.createExpense(expenseDto);
    }

    // ==========================
    // Get All Expenses
    // ==========================
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<ExpenseDto> getAllExpenses() {

        return expenseService.getAllExpenses();
    }

    // ==========================
    // Get Expense By Id
    // ==========================
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public ExpenseDto getExpenseById(
            @PathVariable Long id) {

        return expenseService.getExpenseById(id);
    }

    // ==========================
    // Update Expense
    // ==========================
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public ExpenseDto updateExpense(
            @PathVariable Long id,
            @Valid @RequestBody ExpenseDto expenseDto) {

        return expenseService.updateExpense(id, expenseDto);
    }

    // ==========================
    // Delete Expense
    // ==========================
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteExpense(
            @PathVariable Long id) {

        expenseService.deleteExpense(id);
    }
}