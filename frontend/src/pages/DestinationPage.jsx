import React, { useState } from 'react';
import { Search, MapPin, Navigation, Filter, Star, Clock, Utensils, X } from 'lucide-react';
import { restaurantApi } from '../services/api';
import './Destination.css';

const DestinationPage = () => {
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [hasSearched, setHasSearched] = useState(false); // Track if search was performed
    const [filters, setFilters] = useState({
        rating: 0,
        sortBy: 'distance'
    });

    const requestGeolocation = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude });
                    // Don't auto-load, just save location
                },
                (error) => {
                    console.warn('Geolocation error:', error.message);
                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
            );
        }
    };

    const loadNearbyRestaurants = async (lat, lng) => {
        try {
            setLoading(true);
            setError(null);
            setHasSearched(true);
            const response = await restaurantApi.getNearbyRestaurants(lat, lng, 500);
            const nearbyData = response.data.data || [];
            
            if (nearbyData.length === 0) {
                await loadAllRestaurants();
            } else {
                setRestaurants(nearbyData);
                setLoading(false);
            }
        } catch (err) {
            console.error('Failed to load nearby restaurants:', err);
            loadAllRestaurants();
        }
    };

    const loadAllRestaurants = async () => {
        try {
            setLoading(true);
            setHasSearched(true);
            const response = await restaurantApi.searchRestaurants(null, null);
            setRestaurants(response.data.data || []);
        } catch (err) {
            console.error('Failed to load restaurants:', err);
            setError('Failed to load restaurants. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        
        // If no source/destination entered, search all restaurants
        if (!source.trim() && !destination.trim()) {
            loadAllRestaurants();
            return;
        }

        try {
            setLoading(true);
            setError(null);
            setHasSearched(true);
            const response = await restaurantApi.searchRestaurants(source, destination);
            setRestaurants(response.data.data || []);
        } catch (err) {
            console.error('Search failed:', err);
            setError('Search failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleUseCurrentLocation = () => {
        if (userLocation) {
            loadNearbyRestaurants(userLocation.latitude, userLocation.longitude);
        } else {
            // Request location and then load restaurants
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setUserLocation({ latitude, longitude });
                        loadNearbyRestaurants(latitude, longitude);
                    },
                    (error) => {
                        console.warn('Geolocation error:', error.message);
                        setError('Could not get your location. Please enter manually.');
                    },
                    { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
                );
            } else {
                setError('Geolocation is not supported by your browser.');
            }
        }
    };

    const filteredRestaurants = restaurants
        .filter(r => filters.rating === 0 || Math.random() * 0.5 + 4.5 >= filters.rating)
        .sort((a, b) => {
            if (filters.sortBy === 'name') {
                return a.restaurantName.localeCompare(b.restaurantName);
            }
            return 0;
        });

    return (
        <div className="destination-page">
            <div className="destination-hero">
                <div className="destination-hero-content">
                    <h1>Discover Restaurants</h1>
                    <p>Find the best restaurants along your journey</p>
                </div>
            </div>

            <div className="destination-container">
                {/* Search Form */}
                <div className="search-card glass">
                    <form onSubmit={handleSearch} className="search-form">
                        <div className="search-inputs">
                            <div className="input-group">
                                <MapPin size={20} className="input-icon" />
                                <input
                                    type="text"
                                    placeholder="Source location"
                                    value={source}
                                    onChange={(e) => setSource(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <MapPin size={20} className="input-icon destination-icon" />
                                <input
                                    type="text"
                                    placeholder="Destination location"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="search-actions">
                            <button type="submit" className="btn-search" disabled={loading}>
                                <Search size={18} />
                                {loading ? 'Searching...' : 'Search'}
                            </button>
                            <button 
                                type="button" 
                                className="btn-location"
                                onClick={handleUseCurrentLocation}
                                title="Use current location"
                            >
                                <Navigation size={18} />
                            </button>
                            <button 
                                type="button" 
                                className="btn-filter"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <Filter size={18} />
                            </button>
                        </div>
                    </form>

                    {/* Filters Panel */}
                    {showFilters && (
                        <div className="filters-panel">
                            <div className="filter-group">
                                <label>Minimum Rating</label>
                                <div className="rating-filter">
                                    {[0, 4.0, 4.5, 4.8].map(rating => (
                                        <button
                                            key={rating}
                                            className={`rating-btn ${filters.rating === rating ? 'active' : ''}`}
                                            onClick={() => setFilters({ ...filters, rating })}
                                        >
                                            {rating === 0 ? 'All' : `${rating}+`}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="filter-group">
                                <label>Sort By</label>
                                <select 
                                    value={filters.sortBy}
                                    onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                                >
                                    <option value="distance">Distance</option>
                                    <option value="name">Name</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>

                {/* Error Message */}
                {error && (
                    <div className="error-banner">
                        <p>{error}</p>
                        <button onClick={() => setError(null)}><X size={16} /></button>
                    </div>
                )}

                {/* Results - Only show after search */}
                {hasSearched && (
                    <div className="results-section">
                        <div className="results-header">
                            <h2>{filteredRestaurants.length} Restaurants Found</h2>
                            {userLocation && (
                                <span className="location-badge">
                                    <Navigation size={14} /> Using your location
                                </span>
                            )}
                        </div>

                        {loading ? (
                            <div className="loading-state">
                                <div className="loader-spinner"></div>
                                <p>Finding restaurants...</p>
                            </div>
                        ) : filteredRestaurants.length === 0 ? (
                            <div className="empty-state">
                                <Utensils size={48} />
                                <h3>No restaurants found</h3>
                                <p>Try adjusting your search or filters</p>
                            </div>
                        ) : (
                            <div className="restaurants-grid">
                                {filteredRestaurants.map(restaurant => (
                                    <div key={restaurant.id} className="restaurant-card glass">
                                        <div className="restaurant-image">
                                            <img 
                                                src={`https://images.unsplash.com/photo-1517248135467-4c7edcad34b4?q=80&w=800&auto=format&fit=crop`}
                                                alt={restaurant.restaurantName}
                                            />
                                            <div className="restaurant-badge">
                                                <Star size={12} />
                                                <span>{(4.5 + Math.random() * 0.5).toFixed(1)}</span>
                                            </div>
                                        </div>
                                        <div className="restaurant-info">
                                            <h3>{restaurant.restaurantName}</h3>
                                            <p className="restaurant-address">
                                                <MapPin size={14} />
                                                {restaurant.address}
                                            </p>
                                            <div className="restaurant-meta">
                                                <span><Clock size={14} /> 20-30 min</span>
                                                <span className="distance">
                                                    <Navigation size={14} />
                                                    {restaurant.latitude && restaurant.longitude && userLocation
                                                        ? `${(Math.random() * 20 + 1).toFixed(1)} km`
                                                        : 'Distance N/A'}
                                                </span>
                                            </div>
                                        </div>
                                        <button className="btn-view-menu">
                                            View Menu
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Initial state - prompt user to search */}
                {!hasSearched && !loading && (
                    <div className="initial-state">
                        <Search size={48} />
                        <h3>Search for Restaurants</h3>
                        <p>Enter source and destination or use your current location to find restaurants</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DestinationPage;
