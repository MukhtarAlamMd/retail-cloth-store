package com.clothstore.retail_cloth_store.controller;

import com.clothstore.retail_cloth_store.dto.PurchaseReportDto;
import com.clothstore.retail_cloth_store.service.PurchaseReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/reports/purchases")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class PurchaseReportController {

    private final PurchaseReportService purchaseReportService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public List<PurchaseReportDto> getPurchaseReport(
            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate start,

            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate end) {

        return purchaseReportService.getPurchaseReport(start, end);
    }
}