package com.pikngo.user_service.controller;

import com.pikngo.user_service.dto.PlaceDTO;
import com.pikngo.user_service.service.PlaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/places")
@RequiredArgsConstructor
public class PlaceController {

    private final PlaceService placeService;

    @GetMapping("/search")
    public ResponseEntity<List<PlaceDTO>> searchPlaces(@RequestParam String query) {
        List<PlaceDTO> places = placeService.searchPlaces(query);
        return ResponseEntity.ok(places);
    }

    @GetMapping("/city/{city}")
    public ResponseEntity<List<PlaceDTO>> getPlacesByCity(@PathVariable String city) {
        List<PlaceDTO> places = placeService.getPlacesByCity(city);
        return ResponseEntity.ok(places);
    }

    @GetMapping("/state/{state}")
    public ResponseEntity<List<PlaceDTO>> getPlacesByState(@PathVariable String state) {
        List<PlaceDTO> places = placeService.getPlacesByState(state);
        return ResponseEntity.ok(places);
    }

    @GetMapping
    public ResponseEntity<List<PlaceDTO>> getAllPlaces() {
        List<PlaceDTO> places = placeService.getAllPlaces();
        return ResponseEntity.ok(places);
    }
}
