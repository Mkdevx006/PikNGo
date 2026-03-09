package com.pikngo.user_service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantResponse {

    private UUID id;
    private String restaurantName;
    private String address;
    private Double latitude;
    private Double longitude;
    private boolean isActive;
    private LocalDateTime createdTs;
    private LocalDateTime modifyTs;
}