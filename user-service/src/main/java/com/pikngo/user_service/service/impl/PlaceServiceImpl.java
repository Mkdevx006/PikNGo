package com.pikngo.user_service.service.impl;

import com.pikngo.user_service.dto.PlaceDTO;
import com.pikngo.user_service.entity.Place;
import com.pikngo.user_service.repository.PlaceRepository;
import com.pikngo.user_service.service.PlaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlaceServiceImpl implements PlaceService {

    private final PlaceRepository placeRepository;

    @Override
    public List<PlaceDTO> searchPlaces(String query) {
        if (query == null || query.trim().isEmpty()) {
            return getAllPlaces();
        }
        
        List<Place> places = placeRepository.searchPlaces(query.trim());
        return places.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<PlaceDTO> getPlacesByCity(String city) {
        List<Place> places = placeRepository.findByCity(city);
        return places.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<PlaceDTO> getPlacesByState(String state) {
        List<Place> places = placeRepository.findByState(state);
        return places.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<PlaceDTO> getAllPlaces() {
        List<Place> places = placeRepository.findAll();
        return places.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private PlaceDTO convertToDTO(Place place) {
        return PlaceDTO.builder()
                .id(place.getId().toString())
                .name(place.getName())
                .type(place.getType())
                .city(place.getCity())
                .state(place.getState())
                .pincode(place.getPincode())
                .latitude(place.getLatitude())
                .longitude(place.getLongitude())
                .displayText(place.getDisplayText())
                .build();
    }
}
