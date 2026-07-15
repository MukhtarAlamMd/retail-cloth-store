package com.clothstore.retail_cloth_store.service;

import com.clothstore.retail_cloth_store.dto.InventoryDto;

import java.util.List;

public interface InventoryService {

    List<InventoryDto> getAllInventory();

    List<InventoryDto> getLowStockProducts();

    List<InventoryDto> getOutOfStockProducts();

    InventoryDto getInventoryByProduct(Long productId);

}