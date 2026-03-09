package com.pikngo.user_service.service.impl;

import com.pikngo.user_service.dto.RestaurantRequest;
import com.pikngo.user_service.dto.RestaurantResponse;
import com.pikngo.user_service.entity.Place;
import com.pikngo.user_service.entity.Restaurant;
import com.pikngo.user_service.exception.ResourceNotFoundException;
import com.pikngo.user_service.repository.PlaceRepository;
import com.pikngo.user_service.repository.RestaurantRepository;
import com.pikngo.user_service.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RestaurantServiceImpl implements RestaurantService {

    private final RestaurantRepository restaurantRepository;
    private final PlaceRepository placeRepository;

    @Override
    public RestaurantResponse createRestaurant(RestaurantRequest request) {
        Restaurant restaurant = Restaurant.builder()
                .restaurantName(request.getRestaurantName())
                .address(request.getAddress())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .active(request.isActive())
                .build();

        Restaurant saved = restaurantRepository.save(restaurant);
        return mapToResponse(saved);
    }

    @Override
    public RestaurantResponse updateRestaurant(UUID id, RestaurantRequest request) {
        Restaurant restaurant = restaurantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found with id: " + id));

        restaurant.setRestaurantName(request.getRestaurantName());
        restaurant.setAddress(request.getAddress());
        restaurant.setLatitude(request.getLatitude());
        restaurant.setLongitude(request.getLongitude());
        restaurant.setActive(request.isActive());

        Restaurant updated = restaurantRepository.save(restaurant);
        return mapToResponse(updated);
    }

    @Override
    public List<RestaurantResponse> searchRestaurants(String source, String destination) {
        // If both source and destination are null/empty, return all restaurants
        if ((source == null || source.trim().isEmpty()) && 
            (destination == null || destination.trim().isEmpty())) {
            List<Restaurant> restaurants = restaurantRepository.findByActiveTrueAndIsDeletedFalse();
            return restaurants.stream()
                    .map(this::mapToResponse)
                    .collect(Collectors.toList());
        }

        // Search for places matching source and destination
        List<Place> sourcePlaces = (source != null && !source.trim().isEmpty()) 
                ? placeRepository.searchPlaces(source.trim()) 
                : Collections.emptyList();
        
        List<Place> destPlaces = (destination != null && !destination.trim().isEmpty()) 
                ? placeRepository.searchPlaces(destination.trim()) 
                : Collections.emptyList();

        // If we have matching places, find restaurants near those locations
        if (!sourcePlaces.isEmpty() || !destPlaces.isEmpty()) {
            // Calculate center point between source and destination
            double avgLat = 0.0;
            double avgLng = 0.0;
            int count = 0;

            if (!sourcePlaces.isEmpty()) {
                avgLat += sourcePlaces.get(0).getLatitude();
                avgLng += sourcePlaces.get(0).getLongitude();
                count++;
            }
            if (!destPlaces.isEmpty()) {
                avgLat += destPlaces.get(0).getLatitude();
                avgLng += destPlaces.get(0).getLongitude();
                count++;
            }

            if (count > 0) {
                avgLat /= count;
                avgLng /= count;
                
                // Find restaurants within 50km of the center point
                List<Restaurant> restaurants = restaurantRepository.findNearbyRestaurantsOrdered(
                        avgLat, avgLng, 50.0);
                return restaurants.stream()
                        .map(this::mapToResponse)
                        .collect(Collectors.toList());
            }
        }

        // Fallback: return all restaurants if no location-based matches
        List<Restaurant> restaurants = restaurantRepository.findByActiveTrueAndIsDeletedFalse();
        return restaurants.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<RestaurantResponse> getNearbyRestaurants(double latitude, double longitude, double maxDistanceKm) {
        List<Restaurant> restaurants = restaurantRepository.findNearbyRestaurantsOrdered(latitude, longitude, maxDistanceKm);
        return restaurants.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public Restaurant getRestaurantById(UUID id) {
        return restaurantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found with id: " + id));
    }

    private RestaurantResponse mapToResponse(Restaurant restaurant) {
        return RestaurantResponse.builder()
                .id(restaurant.getId())
                .restaurantName(restaurant.getRestaurantName())
                .address(restaurant.getAddress())
                .latitude(restaurant.getLatitude())
                .longitude(restaurant.getLongitude())
                .isActive(restaurant.isActive())
                .createdTs(restaurant.getCreatedTs())
                .modifyTs(restaurant.getModifyTs())
                .build();
    }
}