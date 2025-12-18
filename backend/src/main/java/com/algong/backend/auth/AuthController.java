package com.algong.backend.auth;

import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest req, HttpSession session) {
        // MVP: 하드코딩 계정
        if (("admin@algong.com".equals(req.email()) && "1234".equals(req.password())) || ("user@algong.com".equals(req.email()) && "1234".equals(req.password())))
        {
            session.setAttribute("USER_EMAIL", req.email());
            session.getId();
            return "OK";
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "아이디/비밀번호가 올바르지 않습니다.");
    }

    @PostMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "OK";
    }

    @GetMapping("/me")
    public MeResponse me(HttpSession session) {
        Object email = session.getAttribute("USER_EMAIL");
        if (email == null) return new MeResponse(false, null);
        return new MeResponse(true, email.toString());
    }

    public record LoginRequest(String email, String password) {}
    public record MeResponse(boolean loggedIn, String email) {}
}