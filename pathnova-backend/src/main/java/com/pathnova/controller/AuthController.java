package com.pathnova.controller;

import com.pathnova.dto.request.LoginRequest;
import com.pathnova.dto.request.RegisterRequest;
import com.pathnova.dto.response.AuthResponse;
import com.pathnova.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest request) {

        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        System.out.println("login succefully..");
        return authService.login(request);
    }
}
