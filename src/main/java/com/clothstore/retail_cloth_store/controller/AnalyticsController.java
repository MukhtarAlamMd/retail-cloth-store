package com.clothstore.retail_cloth_store.controller;

import com.clothstore.retail_cloth_store.dto.SalesAnalyticsDto;
import com.clothstore.retail_cloth_store.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.Year;
import java.util.List;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/monthly-sales")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<SalesAnalyticsDto> monthlySales(
            @RequestParam(required = false) Integer year) {

        if (year == null) {
            year = Year.now().getValue();
        }

        return analyticsService.getMonthlySales(year);
    }
}