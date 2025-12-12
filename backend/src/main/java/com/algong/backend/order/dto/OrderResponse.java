package com.algong.backend.order.dto;

import java.util.List;

public record OrderResponse(
        Long id,
        String email,
        String address,
        int totalAmount,
        List<Item> items
) {
    public record Item(
            Long productId,
            String name,
            int price,
            int quantity
    ) {}
}
