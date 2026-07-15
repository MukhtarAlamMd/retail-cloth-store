package com.clothstore.retail_cloth_store.service;

import com.clothstore.retail_cloth_store.dto.PurchaseReportDto;

import java.time.LocalDate;
import java.util.List;

public interface PurchaseReportService {

    List<PurchaseReportDto> getPurchaseReport(
            LocalDate start,
            LocalDate end
    );
}