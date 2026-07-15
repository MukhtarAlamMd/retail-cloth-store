package com.clothstore.retail_cloth_store.service.impl;

import com.clothstore.retail_cloth_store.dto.StockReportDto;
import com.clothstore.retail_cloth_store.service.StockReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports/stock")
@RequiredArgsConstructor
public class StockReportController {

    private final StockReportService stockReportService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<StockReportDto> getReport() {

        return stockReportService.getStockReport();
    }
}