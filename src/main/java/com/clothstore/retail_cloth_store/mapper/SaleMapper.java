package com.clothstore.retail_cloth_store.mapper;

import com.clothstore.retail_cloth_store.dto.SaleDto;
import com.clothstore.retail_cloth_store.dto.SaleItemDto;
import com.clothstore.retail_cloth_store.entity.Customer;
import com.clothstore.retail_cloth_store.entity.Product;
import com.clothstore.retail_cloth_store.entity.Sale;
import com.clothstore.retail_cloth_store.entity.SaleItem;

import java.util.List;
import java.util.stream.Collectors;

public class SaleMapper {

    // ===========================
    // ENTITY -> DTO
    // ===========================
    public static SaleDto mapToDto(Sale sale) {

        SaleDto dto = new SaleDto();

        dto.setId(sale.getId());
        dto.setInvoiceNumber(sale.getInvoiceNumber());

        if (sale.getCustomer() != null) {

            dto.setCustomerId(sale.getCustomer().getId());

            dto.setCustomerName(
                    sale.getCustomer().getFirstName()
                            + " "
                            + sale.getCustomer().getLastName()
            );
        }

        dto.setSaleDate(sale.getSaleDate());
        dto.setPaymentStatus(sale.getPaymentStatus());
        dto.setGrandTotal(sale.getGrandTotal());

        if (sale.getItems() != null) {

            dto.setItems(
                    sale.getItems()
                            .stream()
                            .map(SaleMapper::mapItemToDto)
                            .collect(Collectors.toList())
            );
        }

        return dto;
    }

    // ===========================
    // DTO -> ENTITY
    // ===========================
    public static Sale mapToEntity(SaleDto dto) {

        Sale sale = new Sale();

        sale.setId(dto.getId());
        sale.setInvoiceNumber(dto.getInvoiceNumber());

        Customer customer = new Customer();
        customer.setId(dto.getCustomerId());

        sale.setCustomer(customer);

        sale.setSaleDate(dto.getSaleDate());
        sale.setPaymentStatus(dto.getPaymentStatus());
        sale.setGrandTotal(dto.getGrandTotal());

        if (dto.getItems() != null) {

            List<SaleItem> items = dto.getItems()
                    .stream()
                    .map(SaleMapper::mapItemToEntity)
                    .collect(Collectors.toList());

            items.forEach(item -> item.setSale(sale));

            sale.setItems(items);
        }

        return sale;
    }

    // ===========================
    // ITEM ENTITY -> DTO
    // ===========================
    private static SaleItemDto mapItemToDto(SaleItem item) {

        SaleItemDto dto = new SaleItemDto();

        dto.setId(item.getId());

        dto.setProductId(item.getProduct().getId());
        dto.setProductName(item.getProduct().getName());

        dto.setQuantity(item.getQuantity());
        dto.setSellingPrice(item.getSellingPrice());
        dto.setTotalPrice(item.getTotalPrice());

        return dto;
    }

    // ===========================
    // ITEM DTO -> ENTITY
    // ===========================
    private static SaleItem mapItemToEntity(SaleItemDto dto) {

        SaleItem item = new SaleItem();

        item.setId(dto.getId());

        Product product = new Product();
        product.setId(dto.getProductId());

        item.setProduct(product);

        item.setQuantity(dto.getQuantity());
        item.setSellingPrice(dto.getSellingPrice());
        item.setTotalPrice(dto.getTotalPrice());

        return item;
    }
}