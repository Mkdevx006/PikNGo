package com.pikngo.user_service.controller;

import com.pikngo.user_service.dto.ApiResponse;
import com.pikngo.user_service.dto.RestaurantRequest;
import com.pikngo.user_service.dto.RestaurantResponse;
import com.pikngo.user_service.service.RestaurantService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/restaurants")
@RequiredArgsConstructor
public class RestaurantController {

    private final RestaurantService restaurantService;

    @PostMapping
    public ResponseEntity<ApiResponse<RestaurantResponse>> createRestaurant(
            @Valid @RequestBody RestaurantRequest request) {
        RestaurantResponse response = restaurantService.createRestaurant(request);
        return new ResponseEntity<>(
                ApiResponse.success("Restaurant created successfully", response),
                HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<RestaurantResponse>> updateRestaurant(
            @PathVariable String id,
            @Valid @RequestBody RestaurantRequest request) {
        RestaurantResponse response = restaurantService.updateRestaurant(java.util.UUID.fromString(id), request);
        return ResponseEntity.ok(ApiResponse.success("Restaurant updated successfully", response));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<RestaurantResponse>>> searchRestaurants(
            @RequestParam(required = false) String source,
            @RequestParam(required = false) String destination) {
        List<RestaurantResponse> responses = restaurantService.searchRestaurants(source, destination);
        return ResponseEntity.ok(ApiResponse.success("Restaurants retrieved successfully", responses));
    }

    @GetMapping("/nearby")
    public ResponseEntity<ApiResponse<List<RestaurantResponse>>> getNearbyRestaurants(
            @RequestParam double latitude,
            @RequestParam double longitude,
            @RequestParam(defaultValue = "50.0") double maxDistanceKm) {
        List<RestaurantResponse> responses = restaurantService.getNearbyRestaurants(latitude, longitude, maxDistanceKm);
        return ResponseEntity.ok(ApiResponse.success("Nearby restaurants retrieved successfully", responses));
    }
}