package com.clothstore.retail_cloth_store.exception;

public class InsufficientStockException
        extends RuntimeException {

    public InsufficientStockException(
            String message) {

        super(message);
    }
}