package com.clothstore.retail_cloth_store.controller;

import com.clothstore.retail_cloth_store.dto.ProfitLossDto;
import com.clothstore.retail_cloth_store.service.ProfitLossService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports/profit")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class ProfitLossController {

    private final ProfitLossService profitLossService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public ProfitLossDto getProfitLoss() {

        return profitLossService.getProfitLoss();
    }
}