package com.pikngo.user_service.service;

import java.util.UUID;

import com.pikngo.user_service.dto.ProfileUpdateRequest;
import com.pikngo.user_service.dto.UserRegistrationRequest;
import com.pikngo.user_service.entity.User;

public interface UserService {
    User registerUser(UserRegistrationRequest request);

    User getUserByPhoneNumber(String phoneNumber);

    User getUserById(UUID id);

    // Developer 3: Profile update
    User updateProfile(UUID userId, ProfileUpdateRequest request);
}