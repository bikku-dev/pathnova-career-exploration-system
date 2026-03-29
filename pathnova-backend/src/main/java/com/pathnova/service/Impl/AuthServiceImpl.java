package com.pathnova.service.Impl;

import com.pathnova.dto.request.LoginRequest;
import com.pathnova.dto.request.RegisterRequest;
import com.pathnova.dto.response.AuthResponse;
import com.pathnova.entity.Role;
import com.pathnova.entity.User;
import com.pathnova.repository.RoleRepository;
import com.pathnova.repository.UserRepository;
import com.pathnova.security.JwtTokenProvider;
import com.pathnova.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final RoleRepository roleRepository;

    @Override
    public AuthResponse register(RegisterRequest request) {

        // check email already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setCollege(request.getCollege());
        user.setYearOfStudy(request.getYearOfStudy());

        Role studentRole = roleRepository
                .findByName("STUDENT")
                .orElseThrow();

        user.setRoles(Set.of(studentRole));

        userRepository.save(user);

        String accessToken = jwtTokenProvider.generateAccessToken(user.getEmail());
        String refreshToken = jwtTokenProvider.generateRefreshToken(user.getEmail());

        return new AuthResponse(
                accessToken,
                refreshToken,
                user.getRoles()
                        .stream()
                        .findFirst()
                        .get()
                        .getName()
        );
    }

    @Override
    public AuthResponse login(LoginRequest request) {

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String accessToken = jwtTokenProvider.generateAccessToken(user.getEmail());
        String refreshToken = jwtTokenProvider.generateRefreshToken(user.getEmail());

        String role = user.getRoles()
                .stream()
                .findFirst()
                .orElseThrow()
                .getName();

        return new AuthResponse(
                accessToken,
                refreshToken,
                role
        );
    }
}