package com.pikngo.user_service.dto;

import lombok.Data;

@Data
public class ProfileUpdateRequest {
    private String firstName;
    private String lastName;
    private String address;
    private String email;
    private String phoneNumber;
    private String profileImageUrl;
}