package com.clothstore.retail_cloth_store.service;

import com.clothstore.retail_cloth_store.dto.LowStockDto;

import java.util.List;

public interface LowStockService {

    List<LowStockDto> getLowStockProducts();

}