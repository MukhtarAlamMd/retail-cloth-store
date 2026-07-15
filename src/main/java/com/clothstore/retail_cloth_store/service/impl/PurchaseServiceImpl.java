package com.clothstore.retail_cloth_store.service.impl;

import com.clothstore.retail_cloth_store.dto.PurchaseDto;
import com.clothstore.retail_cloth_store.entity.PaymentStatus;
import com.clothstore.retail_cloth_store.entity.Product;
import com.clothstore.retail_cloth_store.entity.Purchase;
import com.clothstore.retail_cloth_store.entity.Supplier;
import com.clothstore.retail_cloth_store.exception.ResourceNotFoundException;
import com.clothstore.retail_cloth_store.mapper.PurchaseMapper;
import com.clothstore.retail_cloth_store.repository.ProductRepository;
import com.clothstore.retail_cloth_store.repository.PurchaseRepository;
import com.clothstore.retail_cloth_store.repository.SupplierRepository;
import com.clothstore.retail_cloth_store.service.PurchaseService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PurchaseServiceImpl implements PurchaseService {

    private final PurchaseRepository purchaseRepository;
    private final ProductRepository productRepository;
    private final SupplierRepository supplierRepository;

    @Override
    @Transactional
    public PurchaseDto createPurchase(PurchaseDto dto) {

        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found"));

        Supplier supplier = supplierRepository.findById(dto.getSupplierId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Supplier not found"));

        Purchase purchase = PurchaseMapper.mapToEntity(dto);

        purchase.setProduct(product);
        purchase.setSupplier(supplier);
        purchase.setSupplierName(supplier.getSupplierName());

        purchase.setQuantityPurchased(dto.getQuantityPurchased());
        purchase.setPurchasePrice(dto.getPurchasePrice());

        purchase.setTotalCost(
                dto.getQuantityPurchased() * dto.getPurchasePrice()
        );

        purchase.setPurchaseDate(dto.getPurchaseDate());

        // Payment Status
        if (dto.getPaymentStatus() != null &&
                !dto.getPaymentStatus().isBlank()) {

            purchase.setPaymentStatus(
                    PaymentStatus.valueOf(
                            dto.getPaymentStatus().toUpperCase()
                    )
            );

        } else {

            purchase.setPaymentStatus(PaymentStatus.PENDING);
        }

        // Increase Stock
        product.setStockQuantity(
                product.getStockQuantity() + dto.getQuantityPurchased()
        );

        productRepository.save(product);

        Purchase savedPurchase = purchaseRepository.save(purchase);

        return PurchaseMapper.mapToDto(savedPurchase);
    }

    @Override
    @Transactional
    public PurchaseDto updatePurchase(Long id, PurchaseDto dto) {

        Purchase purchase = purchaseRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Purchase not found"));

        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found"));

        Supplier supplier = supplierRepository.findById(dto.getSupplierId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Supplier not found"));

        purchase.setSupplier(supplier);
        purchase.setSupplierName(supplier.getSupplierName());

        purchase.setProduct(product);

        purchase.setQuantityPurchased(dto.getQuantityPurchased());

        purchase.setPurchasePrice(dto.getPurchasePrice());

        purchase.setTotalCost(
                dto.getQuantityPurchased() * dto.getPurchasePrice()
        );

        purchase.setPurchaseDate(dto.getPurchaseDate());

        // Payment Status
        if (dto.getPaymentStatus() != null &&
                !dto.getPaymentStatus().isBlank()) {

            purchase.setPaymentStatus(
                    PaymentStatus.valueOf(
                            dto.getPaymentStatus().toUpperCase()
                    )
            );

        } else {

            purchase.setPaymentStatus(PaymentStatus.PENDING);
        }

        Purchase updatedPurchase = purchaseRepository.save(purchase);

        return PurchaseMapper.mapToDto(updatedPurchase);
    }

    @Override
    public List<PurchaseDto> getAllPurchases() {

        return purchaseRepository.findAll()
                .stream()
                .map(PurchaseMapper::mapToDto)
                .toList();
    }

    @Override
    public PurchaseDto getPurchaseById(Long id) {

        Purchase purchase = purchaseRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Purchase not found with id : " + id));

        return PurchaseMapper.mapToDto(purchase);
    }

    @Override
    public void deletePurchase(Long id) {

        Purchase purchase = purchaseRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Purchase not found"));

        Product product = purchase.getProduct();

        // Restore Stock
        product.setStockQuantity(
                product.getStockQuantity() - purchase.getQuantityPurchased()
        );

        productRepository.save(product);

        purchaseRepository.delete(purchase);
    }
}