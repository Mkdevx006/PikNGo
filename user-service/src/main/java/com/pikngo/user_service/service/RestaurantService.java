package com.pikngo.user_service.service;

import com.pikngo.user_service.dto.RestaurantRequest;
import com.pikngo.user_service.dto.RestaurantResponse;
import com.pikngo.user_service.entity.Restaurant;

import java.util.List;
import java.util.UUID;

public interface RestaurantService {

    RestaurantResponse createRestaurant(RestaurantRequest request);

    RestaurantResponse updateRestaurant(UUID id, RestaurantRequest request);

    List<RestaurantResponse> searchRestaurants(String source, String destination);

    List<RestaurantResponse> getNearbyRestaurants(double latitude, double longitude, double maxDistanceKm);

    Restaurant getRestaurantById(UUID id);
}