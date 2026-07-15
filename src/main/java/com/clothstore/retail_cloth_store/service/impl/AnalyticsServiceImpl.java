package com.clothstore.retail_cloth_store.service.impl;

import com.clothstore.retail_cloth_store.dto.SalesAnalyticsDto;
import com.clothstore.retail_cloth_store.repository.SaleRepository;
import com.clothstore.retail_cloth_store.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Month;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AnalyticsServiceImpl implements AnalyticsService {

    private final SaleRepository saleRepository;

    @Override
    public List<SalesAnalyticsDto> getMonthlySales(Integer year) {

        List<Object[]> result =
                saleRepository.getMonthlySales(year);

        List<SalesAnalyticsDto> analytics =
                new ArrayList<>();

        for (Object[] row : result) {

            Integer month =
                    ((Number) row[0]).intValue();

            Double sales =
                    ((Number) row[1]).doubleValue();

            analytics.add(

                    SalesAnalyticsDto.builder()
                            .month(Month.of(month).name())
                            .totalSales(sales)
                            .build()

            );
        }

        return analytics;
    }
}