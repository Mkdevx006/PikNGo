package com.pikngo.user_service.controller;

import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pikngo.user_service.dto.OtpRequest;
import com.pikngo.user_service.dto.OtpVerificationRequest;
import com.pikngo.user_service.dto.ProfileUpdateRequest;
import com.pikngo.user_service.dto.UserRegistrationRequest;
import com.pikngo.user_service.entity.User;
import com.pikngo.user_service.service.AuthService;
import com.pikngo.user_service.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@Valid @RequestBody UserRegistrationRequest request) {
        User user = userService.registerUser(request);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PostMapping("/login/send-otp")
    public ResponseEntity<String> sendOtp(@Valid @RequestBody OtpRequest request) {
        authService.sendOtp(request);
        return ResponseEntity.ok("OTP sent successfully to " + request.getPhoneNumber());
    }

    @PostMapping("/login/verify-otp")
    public ResponseEntity<String> verifyOtp(@Valid @RequestBody OtpVerificationRequest request) {
        boolean isValid = authService.verifyOtp(request);
        if (isValid) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired OTP");
        }
    }

    // Developer 3: Profile update endpoint
    @PatchMapping("/{userId}/profile")
    public ResponseEntity<User> updateProfile(
            @PathVariable UUID userId,
            @RequestBody ProfileUpdateRequest request) {
        User updatedUser = userService.updateProfile(userId, request);
        return ResponseEntity.ok(updatedUser);
    }
}