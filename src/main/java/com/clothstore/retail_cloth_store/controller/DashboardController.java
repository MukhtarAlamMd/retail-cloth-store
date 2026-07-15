package com.clothstore.retail_cloth_store.controller;

import com.clothstore.retail_cloth_store.dto.DashboardDto;
import com.clothstore.retail_cloth_store.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public DashboardDto getDashboard() {

        return dashboardService.getDashboard();

    }

}