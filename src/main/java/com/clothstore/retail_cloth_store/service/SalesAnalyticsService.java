package com.clothstore.retail_cloth_store.service;

import com.clothstore.retail_cloth_store.dto.SalesAnalyticsDto;

import java.util.List;

public interface SalesAnalyticsService {

    List<SalesAnalyticsDto> getMonthlySales(Integer year);

}