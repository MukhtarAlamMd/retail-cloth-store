package com.clothstore.retail_cloth_store.repository;

import com.clothstore.retail_cloth_store.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    @Query("""
            SELECT COALESCE(SUM(e.amount), 0)
            FROM Expense e
            """)
    Double getTotalExpense();

}