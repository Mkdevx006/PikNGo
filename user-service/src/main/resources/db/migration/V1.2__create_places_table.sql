-- V1.2__create_places_table.sql
-- Create places table for location suggestions

CREATE TABLE IF NOT EXISTS places (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100),
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    display_text VARCHAR(500),
    created_ts TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    modified_ts TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better search performance
CREATE INDEX IF NOT EXISTS idx_places_name ON places(name);
CREATE INDEX IF NOT EXISTS idx_places_city ON places(city);
CREATE INDEX IF NOT EXISTS idx_places_state ON places(state);
CREATE INDEX IF NOT EXISTS idx_places_type ON places(type);
CREATE INDEX IF NOT EXISTS idx_places_location ON places(latitude, longitude);

-- Add comments
COMMENT ON TABLE places IS 'Master table of Indian places/landmarks for location suggestions';
COMMENT ON COLUMN places.type IS 'Type of place: landmark, area, locality, city, etc.';
COMMENT ON COLUMN places.display_text IS 'Formatted address text for UI display';
