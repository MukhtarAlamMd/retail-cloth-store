package com.clothstore.retail_cloth_store.service;

import com.clothstore.retail_cloth_store.dto.RegisterRequest;
import com.clothstore.retail_cloth_store.dto.UpdateUserRequest;
import com.clothstore.retail_cloth_store.dto.UserDto;

import java.util.List;

public interface UserService {

    List<UserDto> getAllUsers();

    UserDto getUserById(Long id);

    UserDto createUser(RegisterRequest request);

    UserDto updateUser(Long id, UpdateUserRequest request);

    void deleteUser(Long id);
}