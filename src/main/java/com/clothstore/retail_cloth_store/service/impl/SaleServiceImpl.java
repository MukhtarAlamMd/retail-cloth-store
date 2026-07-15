package com.clothstore.retail_cloth_store.service.impl;

import com.clothstore.retail_cloth_store.dto.SaleDto;
import com.clothstore.retail_cloth_store.entity.*;
import com.clothstore.retail_cloth_store.exception.InsufficientStockException;
import com.clothstore.retail_cloth_store.exception.ResourceNotFoundException;
import com.clothstore.retail_cloth_store.mapper.SaleMapper;
import com.clothstore.retail_cloth_store.repository.CustomerRepository;
import com.clothstore.retail_cloth_store.repository.ProductRepository;
import com.clothstore.retail_cloth_store.repository.SaleRepository;
import com.clothstore.retail_cloth_store.service.SaleService;

import jakarta.transaction.Transactional;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
@Transactional
public class SaleServiceImpl implements SaleService {


    private final SaleRepository saleRepository;

    private final ProductRepository productRepository;

    private final CustomerRepository customerRepository;



    // =====================================================
    // CREATE SALE
    // =====================================================

    @Override
    public SaleDto createSale(SaleDto dto) {


        Customer customer =
                customerRepository.findById(dto.getCustomerId())

                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Customer not found with id : "
                                                + dto.getCustomerId()
                                ));


        if(dto.getItems()==null ||
                dto.getItems().isEmpty()){

            throw new RuntimeException(
                    "Sale must contain at least one product"
            );
        }



        Sale sale =
                SaleMapper.mapToEntity(dto);


        sale.setCustomer(customer);



        double grandTotal = 0;



        for(SaleItem item : sale.getItems()){


            Product product =
                    productRepository.findById(
                                    item.getProduct().getId()
                            )

                            .orElseThrow(() ->
                                    new ResourceNotFoundException(
                                            "Product not found"
                                    ));



            if(product.getStockQuantity()
                    < item.getQuantity()){


                throw new InsufficientStockException(

                        "Insufficient stock for product : "
                                + product.getName()
                                +
                                " Available : "
                                + product.getStockQuantity()
                );

            }



            // Reduce stock

            product.setStockQuantity(
                    product.getStockQuantity()
                            -
                            item.getQuantity()
            );


            productRepository.save(product);



            item.setProduct(product);

            item.setSale(sale);



            double total =
                    item.getQuantity()
                            *
                            item.getSellingPrice();


            item.setTotalPrice(total);


            grandTotal += total;

        }



        sale.setGrandTotal(grandTotal);



        if(dto.getPaymentStatus()==null ||
                dto.getPaymentStatus().isBlank()){

            sale.setPaymentStatus(
                    "PENDING"
            );
        }



        Sale saved =
                saleRepository.save(sale);



        return SaleMapper.mapToDto(saved);

    }




    // =====================================================
    // GET ALL SALES
    // =====================================================

    @Override
    public List<SaleDto> getAllSales() {


        return saleRepository.findAll()

                .stream()

                .map(SaleMapper::mapToDto)

                .toList();

    }




    // =====================================================
    // GET SALE BY ID
    // =====================================================

    @Override
    public SaleDto getSaleById(Long id) {


        Sale sale =
                saleRepository.findById(id)

                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Sale not found with id : "
                                                + id
                                ));


        return SaleMapper.mapToDto(sale);

    }





    // =====================================================
    // UPDATE SALE
    // =====================================================

    @Override
    public SaleDto updateSale(Long id, SaleDto dto) {


        Sale sale =
                saleRepository.findById(id)

                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Sale not found"
                                ));



        Customer customer =
                customerRepository.findById(dto.getCustomerId())

                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Customer not found"
                                ));



        sale.setCustomer(customer);

        sale.setInvoiceNumber(
                dto.getInvoiceNumber()
        );

        sale.setSaleDate(
                dto.getSaleDate()
        );

        sale.setPaymentStatus(
                dto.getPaymentStatus()
        );



        // Restore old stock

        for(SaleItem oldItem : sale.getItems()){


            Product oldProduct =
                    oldItem.getProduct();


            oldProduct.setStockQuantity(
                    oldProduct.getStockQuantity()
                            +
                            oldItem.getQuantity()
            );


            productRepository.save(oldProduct);

        }



        sale.getItems().clear();



        double totalAmount = 0;



        for(SaleItem newItem :
                SaleMapper.mapToEntity(dto).getItems()){



            Product product =
                    productRepository.findById(
                                    newItem.getProduct().getId()
                            )

                            .orElseThrow(() ->
                                    new ResourceNotFoundException(
                                            "Product not found"
                                    ));



            if(product.getStockQuantity()
                    <
                    newItem.getQuantity()){


                throw new InsufficientStockException(

                        "Insufficient stock for product : "
                                +
                                product.getName()
                );
            }



            product.setStockQuantity(
                    product.getStockQuantity()
                            -
                            newItem.getQuantity()
            );


            productRepository.save(product);



            newItem.setSale(sale);

            newItem.setProduct(product);



            newItem.setTotalPrice(
                    newItem.getQuantity()
                            *
                            newItem.getSellingPrice()
            );



            totalAmount +=
                    newItem.getTotalPrice();



            sale.getItems().add(newItem);

        }



        sale.setGrandTotal(totalAmount);



        Sale updated =
                saleRepository.save(sale);



        return SaleMapper.mapToDto(updated);

    }




    // =====================================================
    // DELETE SALE
    // =====================================================

    @Override
    public void deleteSale(Long id) {


        Sale sale =
                saleRepository.findById(id)

                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Sale not found"
                                ));



        // Restore stock

        for(SaleItem item : sale.getItems()){


            Product product =
                    item.getProduct();



            product.setStockQuantity(
                    product.getStockQuantity()
                            +
                            item.getQuantity()
            );


            productRepository.save(product);

        }



        saleRepository.delete(sale);

    }

}