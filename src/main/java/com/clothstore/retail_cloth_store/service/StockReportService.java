package com.clothstore.retail_cloth_store.service;

import com.clothstore.retail_cloth_store.dto.StockReportDto;

import java.util.List;

public interface StockReportService {

    List<StockReportDto> getStockReport();

}