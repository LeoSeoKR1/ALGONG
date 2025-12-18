package com.algong.backend.order;

import com.algong.backend.order.dto.OrderRequest;
import com.algong.backend.order.dto.OrderResponse;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Transactional
    public Long placeOrder(OrderRequest request, String userEmail) {
        Order order = new Order(
                userEmail,
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

        orderRepository.save(order);
        return order.getId();
    }

    @Transactional(readOnly = true)
    public OrderResponse findOrder(Long orderId, String userEmail) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "주문이 없습니다."));

        if (!order.getUserEmail().equals(userEmail)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "접근 권한이 없습니다.");
        }
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

    @Transactional(readOnly = true)
    public List<OrderResponse> findMyOrders(String userEmail) {
        return orderRepository.findByUserEmailOrderByIdDesc(userEmail)
                .stream()
                .map(order -> new OrderResponse(
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
                ))
                .toList();
    }
}
