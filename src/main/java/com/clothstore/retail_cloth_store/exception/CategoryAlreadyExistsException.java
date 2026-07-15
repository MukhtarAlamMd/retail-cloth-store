package com.clothstore.retail_cloth_store.exception;

public class CategoryAlreadyExistsException
        extends RuntimeException {

    public CategoryAlreadyExistsException(String message) {
        super(message);
    }
}