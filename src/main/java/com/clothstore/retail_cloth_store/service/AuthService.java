package com.clothstore.retail_cloth_store.service;

import com.clothstore.retail_cloth_store.dto.LoginRequest;
import com.clothstore.retail_cloth_store.dto.LoginResponse;
import com.clothstore.retail_cloth_store.dto.RegisterRequest;
import com.clothstore.retail_cloth_store.dto.RegisterResponse;

public interface AuthService {

    RegisterResponse register(RegisterRequest request);

    LoginResponse login(LoginRequest request);
}