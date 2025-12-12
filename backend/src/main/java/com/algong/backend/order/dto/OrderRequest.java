package com.algong.backend.order.dto;

import java.util.List;

public record OrderRequest(
    Buyer buyer,
    List<Item> items,
    int total
) {
    public record Buyer(String email, String address) {}
    public record Item(Long productId, String name, int price, int quantity) {}
}
