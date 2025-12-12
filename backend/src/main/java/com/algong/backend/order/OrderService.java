package com.algong.backend.order;

import com.algong.backend.order.dto.OrderRequest;
import com.algong.backend.order.dto.OrderResponse;
import org.springframework.transaction.annotation.Transactional;
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

    @Transactional(readOnly = true)
    public OrderResponse findOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("주문이 없습니다."));

        return new OrderResponse(
                order.getId(),
                order.getEmail(),
                order.getAddress(),
                order.getTotalAmount(),
                order.getItems().stream()
                        .map(i -> new OrderResponse.Item(
                                i.getProductId(),
                                i.getName(),
                                i.getPrice(),
                                i.getQuantity()
                        ))
                        .toList()
        );
    }
}
