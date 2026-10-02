package com.devflow.devflow.auth.dto;

public record RegisterRequest(
        String username,
        String email,
        String password
) {}
