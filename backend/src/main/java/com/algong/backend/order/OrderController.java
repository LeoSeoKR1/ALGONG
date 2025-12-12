package com.algong.backend.order;

import com.algong.backend.order.dto.OrderRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public Long create(@RequestBody OrderRequest request) {
        return orderService.placeOrder(request);
    }
}
