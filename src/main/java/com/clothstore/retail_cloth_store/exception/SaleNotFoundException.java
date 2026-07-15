package com.clothstore.retail_cloth_store.exception;

public class SaleNotFoundException
        extends RuntimeException {

    public SaleNotFoundException(String message) {
        super(message);
    }
}