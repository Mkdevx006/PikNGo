package com.pikngo.user_service.repository;

import com.pikngo.user_service.entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PlaceRepository extends JpaRepository<Place, UUID> {
    
    List<Place> findByCity(String city);
    
    List<Place> findByState(String state);
    
    List<Place> findByType(String type);
    
    @Query("SELECT p FROM Place p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(p.city) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(p.displayText) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Place> searchPlaces(@Param("query") String query);
    
    @Query("SELECT p FROM Place p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "ORDER BY p.name ASC")
    List<Place> findByNameContaining(@Param("query") String query);
}
