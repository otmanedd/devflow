package com.devflow.devflow.auth.dto;

public record LoginRequest(
        String username,
        String password
) {}
