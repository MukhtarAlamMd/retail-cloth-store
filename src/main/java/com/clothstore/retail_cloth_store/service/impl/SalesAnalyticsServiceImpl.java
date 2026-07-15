package com.clothstore.retail_cloth_store.service.impl;



import com.clothstore.retail_cloth_store.dto.SalesAnalyticsDto;
import com.clothstore.retail_cloth_store.repository.SaleRepository;
import com.clothstore.retail_cloth_store.service.SalesAnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Month;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SalesAnalyticsServiceImpl implements SalesAnalyticsService {

    private final SaleRepository saleRepository;

    @Override
    public List<SalesAnalyticsDto> getMonthlySales(Integer year) {

        List<Object[]> result = saleRepository.getMonthlySales(year);

        List<SalesAnalyticsDto> list = new ArrayList<>();

        for (Object[] row : result) {

            Integer month = ((Number) row[0]).intValue();

            Double amount = ((Number) row[1]).doubleValue();

            list.add(
                    SalesAnalyticsDto.builder()
                            .month(Month.of(month).name())
                            .totalSales(amount)
                            .build()
            );
        }

        return list;
    }
}