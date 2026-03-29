package com.pathnova.service;

import com.pathnova.dto.request.LoginRequest;
import com.pathnova.dto.request.RegisterRequest;
import com.pathnova.dto.response.AuthResponse;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

}
