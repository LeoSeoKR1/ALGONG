package com.algong.backend.order;

import com.algong.backend.order.dto.OrderRequest;
import com.algong.backend.order.dto.OrderResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public Long create(@RequestBody OrderRequest request, HttpSession session) {
        Object email = session.getAttribute("USER_EMAIL");
        if (email == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다.");
        }
        return orderService.placeOrder(request, email.toString());
    }

    @GetMapping("/{id}")
    public OrderResponse get(@PathVariable Long id, HttpSession session) {
        Object email = session.getAttribute("USER_EMAIL");
        if (email == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다.");
        }
        return orderService.findOrder(id, email.toString());
    }

    @GetMapping("/my")
    public List<OrderResponse> my(HttpSession session) {
        System.out.println(">>> HIT /orders/my");
        Object email = session.getAttribute("USER_EMAIL");
        System.out.println(">>> USER_EMAIL = " + email);

        if (email == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다.");
        }

        List<OrderResponse> result = orderService.findMyOrders(email.toString());
        System.out.println(">>> RESULT SIZE = " + result.size());
        return result;
    }
}