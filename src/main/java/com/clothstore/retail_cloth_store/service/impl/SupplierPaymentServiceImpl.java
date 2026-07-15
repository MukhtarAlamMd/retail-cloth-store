package com.clothstore.retail_cloth_store.service.impl;

import com.clothstore.retail_cloth_store.dto.SupplierPaymentDto;
import com.clothstore.retail_cloth_store.entity.Supplier;
import com.clothstore.retail_cloth_store.entity.SupplierPayment;
import com.clothstore.retail_cloth_store.repository.SupplierPaymentRepository;
import com.clothstore.retail_cloth_store.repository.SupplierRepository;
import com.clothstore.retail_cloth_store.service.SupplierPaymentService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class SupplierPaymentServiceImpl
        implements SupplierPaymentService {

    private final SupplierPaymentRepository supplierPaymentRepository;
    private final SupplierRepository supplierRepository;

    // =====================================================
    // Save
    // =====================================================

    @Override
    public SupplierPaymentDto saveSupplierPayment(
            SupplierPaymentDto dto) {

        Supplier supplier = supplierRepository
                .findById(dto.getSupplierId())
                .orElseThrow(() ->
                        new RuntimeException("Supplier not found"));

        SupplierPayment payment = SupplierPayment.builder()

                .supplier(supplier)
                .amount(dto.getAmount())
                .paymentDate(dto.getPaymentDate())
                .paymentMethod(dto.getPaymentMethod())
                .referenceNumber(dto.getReferenceNumber())
                .remarks(dto.getRemarks())

                .build();

        payment = supplierPaymentRepository.save(payment);

        return mapToDto(payment);
    }

    // =====================================================
    // Update
    // =====================================================

    @Override
    public SupplierPaymentDto updateSupplierPayment(
            Long id,
            SupplierPaymentDto dto) {

        SupplierPayment payment =
                supplierPaymentRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Payment not found"));

        Supplier supplier =
                supplierRepository.findById(dto.getSupplierId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Supplier not found"));

        payment.setSupplier(supplier);
        payment.setAmount(dto.getAmount());
        payment.setPaymentDate(dto.getPaymentDate());
        payment.setPaymentMethod(dto.getPaymentMethod());
        payment.setReferenceNumber(dto.getReferenceNumber());
        payment.setRemarks(dto.getRemarks());

        payment = supplierPaymentRepository.save(payment);

        return mapToDto(payment);
    }

    // =====================================================
    // Delete
    // =====================================================

    @Override
    public void deleteSupplierPayment(Long id) {

        SupplierPayment payment =
                supplierPaymentRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Payment not found"));

        supplierPaymentRepository.delete(payment);
    }

    // =====================================================
    // Get By Id
    // =====================================================

    @Override
    public SupplierPaymentDto getSupplierPaymentById(
            Long id) {

        return supplierPaymentRepository.findById(id)
                .map(this::mapToDto)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Payment not found"));
    }

    // =====================================================
    // Get All
    // =====================================================

    @Override
    public List<SupplierPaymentDto>
    getAllSupplierPayments() {

        return supplierPaymentRepository.findAll()

                .stream()

                .map(this::mapToDto)

                .collect(Collectors.toList());
    }

    // =====================================================
    // Supplier History
    // =====================================================

    @Override
    public List<SupplierPaymentDto>
    getPaymentsBySupplier(Long supplierId) {

        return supplierPaymentRepository
                .findBySupplierIdOrderByPaymentDateDesc(
                        supplierId)

                .stream()

                .map(this::mapToDto)

                .collect(Collectors.toList());
    }

    // =====================================================
    // Date Report
    // =====================================================

    @Override
    public List<SupplierPaymentDto>
    getPaymentsBetweenDates(
            LocalDate startDate,
            LocalDate endDate) {

        return supplierPaymentRepository
                .findByPaymentDateBetween(
                        startDate,
                        endDate)

                .stream()

                .map(this::mapToDto)

                .collect(Collectors.toList());
    }

    // =====================================================
    // Supplier Date Report
    // =====================================================

    @Override
    public List<SupplierPaymentDto>
    getSupplierPaymentsBetweenDates(
            Long supplierId,
            LocalDate startDate,
            LocalDate endDate) {

        return supplierPaymentRepository
                .findBySupplierIdAndPaymentDateBetween(
                        supplierId,
                        startDate,
                        endDate)

                .stream()

                .map(this::mapToDto)

                .collect(Collectors.toList());
    }

    // =====================================================
    // Totals
    // =====================================================

    @Override
    public Double getTotalPaymentBySupplier(
            Long supplierId) {

        return supplierPaymentRepository
                .getTotalPaymentBySupplier(supplierId);
    }

    @Override
    public Double getTotalPayments() {

        return supplierPaymentRepository
                .getTotalPayments();
    }

    // =====================================================
    // Latest Payments
    // =====================================================

    @Override
    public List<SupplierPaymentDto>
    getLatestPayments() {

        return supplierPaymentRepository
                .findTop10ByOrderByPaymentDateDesc()

                .stream()

                .map(this::mapToDto)

                .collect(Collectors.toList());
    }

    // =====================================================
    // DTO Mapper
    // =====================================================

    private SupplierPaymentDto mapToDto(
            SupplierPayment payment) {

        return SupplierPaymentDto.builder()

                .id(payment.getId())

                .supplierId(payment.getSupplier().getId())

                .supplierName(payment.getSupplier().getSupplierName())

                .amount(payment.getAmount())

                .paymentDate(payment.getPaymentDate())

                .paymentMethod(payment.getPaymentMethod())

                .referenceNumber(payment.getReferenceNumber())

                .remarks(payment.getRemarks())

                .build();
    }

}