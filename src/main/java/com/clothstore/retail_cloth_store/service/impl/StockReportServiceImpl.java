package com.clothstore.retail_cloth_store.service.impl;

import com.clothstore.retail_cloth_store.dto.StockReportDto;
import com.clothstore.retail_cloth_store.entity.Product;
import com.clothstore.retail_cloth_store.repository.ProductRepository;
import com.clothstore.retail_cloth_store.service.StockReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StockReportServiceImpl
        implements StockReportService {

    private final ProductRepository productRepository;

    @Override
    public List<StockReportDto> getStockReport() {

        return productRepository.findAll()
                .stream()
                .map(this::convert)
                .toList();
    }

    private StockReportDto convert(Product product) {

        String status;

        if (product.getStockQuantity() == 0) {

            status = "OUT OF STOCK";

        } else if (product.getStockQuantity() <= 10) {

            status = "LOW STOCK";

        } else {

            status = "IN STOCK";
        }

        return StockReportDto.builder()

                .productId(product.getId())

                .productName(product.getName())

                .category(product.getCategory().getName())

                .stock(product.getStockQuantity())

                .buyingPrice(product.getPurchasePrice())

                .sellingPrice(product.getSellingPrice())

                .stockValue(
                        product.getPurchasePrice()
                                * product.getStockQuantity())

                .expectedProfit(
                        (product.getSellingPrice()
                                - product.getPurchasePrice())
                                * product.getStockQuantity())

                .stockStatus(status)

                .build();
    }
}