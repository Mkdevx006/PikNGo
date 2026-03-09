package com.pikngo.user_service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlaceDTO {
    private String id;
    private String name;
    private String type;
    private String city;
    private String state;
    private String pincode;
    private Double latitude;
    private Double longitude;
    private String displayText;
}
