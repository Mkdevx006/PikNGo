-- V1.4__seed_restaurant_data.sql
-- Seed initial restaurant data for testing

INSERT INTO restaurants (restaurant_name, address, latitude, longitude, is_active, is_deleted, created_ts, modify_ts) VALUES
('Royal Cuisines', 'Connaught Place, New Delhi, Delhi 110001', 28.6315, 77.2167, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Highway Spice', 'Sector 18, Noida, Uttar Pradesh 201301', 28.5677, 77.3270, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('The Grand Trunk', 'Karol Bagh, Central Delhi, Delhi 110005', 28.6519, 77.1909, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Mumbai Delights', 'Linking Road, Bandra West, Mumbai 400050', 19.0547, 72.8343, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Gateway Grill', 'Colaba Causeway, Mumbai 400005', 18.9140, 72.8140, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Marine Drive Kitchen', 'Marine Drive, Mumbai 400020', 18.9432, 72.8236, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Bangalore Bites', 'MG Road, Bangalore 560001', 12.9716, 77.5946, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Indiranagar Cafe', 'Indiranagar, Bangalore 560038', 12.9719, 77.6412, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Koramangala Kitchen', 'Koramangala 5th Block, Bangalore 560034', 12.9352, 77.6245, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Chennai Chettinad', 'T Nagar, Chennai 600017', 13.0418, 80.2341, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Marina Restaurant', 'Marina Beach Road, Chennai 600001', 13.0500, 80.2800, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Adyar Annapoorna', 'Adyar, Chennai 600020', 13.0067, 80.2570, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Kolkata Kathi', 'Park Street, Kolkata 700016', 22.5543, 88.3516, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Victoria View', 'Near Victoria Memorial, Kolkata 700071', 22.5448, 88.3426, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Ballygunge Bhoj', 'Ballygunge Circular Road, Kolkata 700019', 22.5330, 88.3650, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Hyderabad House', 'Banjara Hills, Hyderabad 500034', 17.4239, 78.4482, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Charminar Kitchen', 'Old City, Hyderabad 500002', 17.3616, 78.4747, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('HITEC City Cafe', 'Madhapur HITEC City, Hyderabad 500081', 17.4470, 78.3910, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Pune Peshwai', 'FC Road, Pune 411004', 18.5290, 73.8350, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Deccan Delights', 'JM Road Deccan, Pune 411004', 18.5200, 73.8400, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Koregaon Park Cafe', 'Koregaon Park, Pune 411001', 18.5360, 73.8980, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Ahmedabad Adda', 'CG Road, Ahmedabad 380009', 23.0350, 72.5650, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Sabarmati Spice', 'Ashram Road, Ahmedabad 380009', 23.0350, 72.5800, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Satellite Kitchen', 'Satellite Jodhpur Park, Ahmedabad 380015', 23.0270, 72.5070, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Jaipur Mahal', 'MI Road, Jaipur 302001', 26.9150, 75.8180, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Hawa Mahal Restaurant', 'Johari Bazaar, Jaipur 302003', 26.9250, 75.8250, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Pink City Dining', 'C Scheme, Jaipur 302001', 26.9100, 75.8000, true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_restaurants_active ON restaurants(is_active);
CREATE INDEX IF NOT EXISTS idx_restaurants_deleted ON restaurants(is_deleted);
