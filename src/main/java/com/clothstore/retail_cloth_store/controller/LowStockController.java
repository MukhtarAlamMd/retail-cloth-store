package com.clothstore.retail_cloth_store.controller;

import com.clothstore.retail_cloth_store.dto.LowStockDto;
import com.clothstore.retail_cloth_store.service.LowStockService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports/low-stock")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class LowStockController {

    private final LowStockService lowStockService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<LowStockDto> getLowStockProducts() {

        return lowStockService.getLowStockProducts();
    }


    @GetMapping("/count")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public long getLowStockCount() {

        return lowStockService.getLowStockProducts().size();
    }
}