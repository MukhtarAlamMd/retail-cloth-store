package com.clothstore.retail_cloth_store.mapper;

import com.clothstore.retail_cloth_store.dto.UserDto;
import com.clothstore.retail_cloth_store.entity.User;

public class UserMapper {

    public static UserDto mapToUserDto(User user) {

        return UserDto.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .address(user.getAddress())
                .role(user.getRole())
                .active(user.getActive())
                .build();
    }
}