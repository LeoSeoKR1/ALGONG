package com.algong.backend.order;

import com.algong.backend.order.dto.OrderRequest;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Transactional
    public Long placeOrder(OrderRequest request) {
        Order order = new Order(
                request.buyer().email(),
                request.buyer().address(),
                request.total()
        );

        request.items().forEach(i ->
                order.addItem(new OrderItem(
                        i.productId(),
                        i.name(),
                        i.price(),
                        i.quantity()
                ))
        );

        Order saved = orderRepository.save(order);
        return saved.getId();
    }
}
