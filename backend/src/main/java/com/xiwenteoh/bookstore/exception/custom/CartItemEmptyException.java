package com.xiwenteoh.bookstore.exception.custom;

public class CartItemEmptyException extends RuntimeException {
    public CartItemEmptyException(Long userId) {
        super(String.format("User ID = %d has no item in cart", userId));
    }
}

