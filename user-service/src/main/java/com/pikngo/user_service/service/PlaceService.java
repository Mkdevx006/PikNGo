package com.pikngo.user_service.service;

import com.pikngo.user_service.dto.PlaceDTO;
import java.util.List;

public interface PlaceService {
    List<PlaceDTO> searchPlaces(String query);
    List<PlaceDTO> getPlacesByCity(String city);
    List<PlaceDTO> getPlacesByState(String state);
    List<PlaceDTO> getAllPlaces();
}
