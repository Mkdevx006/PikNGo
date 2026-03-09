-- V1.1__add_geolocation_fields_to_addresses.sql
-- Add latitude and longitude columns to addresses table

ALTER TABLE IF EXISTS addresses
ADD COLUMN IF NOT EXISTS latitude DOUBLE PRECISION;

ALTER TABLE IF EXISTS addresses
ADD COLUMN IF NOT EXISTS longitude DOUBLE PRECISION;

-- Add comment for documentation
COMMENT ON COLUMN addresses.latitude IS 'Latitude coordinate for geolocation';
COMMENT ON COLUMN addresses.longitude IS 'Longitude coordinate for geolocation';
