package com.algong.backend.product.dto;

public record ProductResponse(
        Long id,
        String name,
        int price
) {}