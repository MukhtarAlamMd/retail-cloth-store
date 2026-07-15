package com.clothstore.retail_cloth_store.service.impl;

import com.clothstore.retail_cloth_store.dto.PaymentDto;
import com.clothstore.retail_cloth_store.entity.Invoice;
import com.clothstore.retail_cloth_store.entity.Payment;
import com.clothstore.retail_cloth_store.exception.ResourceNotFoundException;
import com.clothstore.retail_cloth_store.mapper.PaymentMapper;
import com.clothstore.retail_cloth_store.repository.InvoiceRepository;
import com.clothstore.retail_cloth_store.repository.PaymentRepository;
import com.clothstore.retail_cloth_store.service.PaymentService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final InvoiceRepository invoiceRepository;

    @Override
    public PaymentDto createPayment(PaymentDto dto) {

        Invoice invoice = invoiceRepository.findById(dto.getInvoiceId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Invoice not found with id : "
                                        + dto.getInvoiceId()
                        ));

        Payment payment = PaymentMapper.mapToEntity(dto);

        payment.setInvoice(invoice);

        Payment savedPayment = paymentRepository.save(payment);

        return PaymentMapper.mapToDto(savedPayment);
    }

    @Override
    public List<PaymentDto> getAllPayments() {

        return paymentRepository.findAll()
                .stream()
                .map(PaymentMapper::mapToDto)
                .toList();
    }

    @Override
    public PaymentDto getPaymentById(Long id) {

        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Payment not found with id : " + id
                        ));

        return PaymentMapper.mapToDto(payment);
    }

    @Override
    public PaymentDto updatePayment(Long id, PaymentDto dto) {

        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Payment not found with id : " + id
                        ));

        Invoice invoice = invoiceRepository.findById(dto.getInvoiceId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Invoice not found with id : "
                                        + dto.getInvoiceId()
                        ));

        payment.setInvoice(invoice);
        payment.setAmount(dto.getAmount());
        payment.setPaymentMethod(dto.getPaymentMethod());
        payment.setPaymentStatus(dto.getPaymentStatus());
        payment.setTransactionId(dto.getTransactionId());
        payment.setPaymentDate(dto.getPaymentDate());

        Payment updatedPayment = paymentRepository.save(payment);

        return PaymentMapper.mapToDto(updatedPayment);
    }

    @Override
    public void deletePayment(Long id) {

        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Payment not found with id : " + id
                        ));

        paymentRepository.delete(payment);
    }
}