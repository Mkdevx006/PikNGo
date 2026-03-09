package com.pikngo.user_service.repository;

import com.pikngo.user_service.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, UUID> {

    List<Restaurant> findByActiveTrueAndIsDeletedFalse();

    @Query("SELECT r FROM Restaurant r WHERE r.active = true AND r.isDeleted = false " +
           "AND (6371 * acos(cos(radians(:lat)) * cos(radians(r.latitude)) * cos(radians(r.longitude) - radians(:lng)) + sin(radians(:lat)) * sin(radians(r.latitude)))) < :distance")
    List<Restaurant> findNearbyRestaurants(@Param("lat") double latitude, @Param("lng") double longitude, @Param("distance") double distanceInKm);

    @Query("SELECT r FROM Restaurant r WHERE r.active = true AND r.isDeleted = false " +
           "AND (6371 * acos(cos(radians(:lat)) * cos(radians(r.latitude)) * cos(radians(r.longitude) - radians(:lng)) + sin(radians(:lat)) * sin(radians(r.latitude)))) <= :maxDistance " +
           "ORDER BY (6371 * acos(cos(radians(:lat)) * cos(radians(r.latitude)) * cos(radians(r.longitude) - radians(:lng)) + sin(radians(:lat)) * sin(radians(r.latitude)))) ASC")
    List<Restaurant> findNearbyRestaurantsOrdered(@Param("lat") double latitude, @Param("lng") double longitude, @Param("maxDistance") double maxDistanceKm);
}