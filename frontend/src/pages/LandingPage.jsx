import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero/Hero';
import FoodCard from '../components/FoodCard/FoodCard';
import { Truck, Clock, ShieldCheck, Map, MapPin, Navigation, Coffee, Pizza, Salad, Soup, Sandwich, IceCream, ArrowRight } from 'lucide-react';
import Logo from '../components/Logo/Logo';
import { restaurantApi } from '../services/api';
import './LandingPage.css';

const trendingFoods = [
    { id: 1, name: 'Gourmet Truffle Burger', restaurant: 'Royal Cuisines', price: 450, rating: 4.9, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1500&auto=format&fit=crop' },
    { id: 2, name: 'Avocado Zen Bowl', restaurant: 'Green Bliss', price: 380, rating: 4.7, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1500&auto=format&fit=crop' },
    { id: 3, name: 'Premium Mutton Biryani', restaurant: 'Legacy Flavors', price: 520, rating: 4.8, image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=1500&auto=format&fit=crop' },
    { id: 4, name: 'Classic Paneer Tikka', restaurant: 'Highway Spice', price: 280, rating: 4.7, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=1500&auto=format&fit=crop' },
];

const mealCategories = [
    { id: 1, name: 'Breakfast', icon: Coffee, color: '#f59e0b', items: '45+ items', image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=800&auto=format&fit=crop' },
    { id: 2, name: 'Main Course', icon: Pizza, color: '#ef4444', items: '120+ items', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop' },
    { id: 3, name: 'Healthy', icon: Salad, color: '#22c55e', items: '60+ items', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop' },
    { id: 4, name: 'Soups', icon: Soup, color: '#8b5cf6', items: '25+ items', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800&auto=format&fit=crop' },
    { id: 5, name: 'Snacks', icon: Sandwich, color: '#ec4899', items: '80+ items', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=800&auto=format&fit=crop' },
    { id: 6, name: 'Desserts', icon: IceCream, color: '#06b6d4', items: '35+ items', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800&auto=format&fit=crop' },
];

const popularMeals = [
    { id: 1, name: 'Butter Chicken', price: 350, rating: 4.9, time: '25 min', image: '/assets/food-1.png' },
    { id: 2, name: 'Veg Thali', price: 220, rating: 4.7, time: '20 min', image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=800&auto=format&fit=crop' },
    { id: 3, name: 'Masala Dosa', price: 120, rating: 4.8, time: '15 min', image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=800&auto=format&fit=crop' },
    { id: 4, name: 'Chicken Biryani', price: 280, rating: 4.9, time: '30 min', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop' },
    { id: 5, name: 'Paneer Tikka', price: 200, rating: 4.6, time: '20 min', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=800&auto=format&fit=crop' },
    { id: 6, name: 'Dal Makhani', price: 180, rating: 4.7, time: '25 min', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop' },
];

const steps = [
    { id: 1, title: 'Search Route', desc: 'Enter your starting point and destination to find top-rated rest stops.', icon: <Map size={32} /> },
    { id: 2, title: 'Choose Meal', desc: 'Browse curated menus and pre-order your favorite delicacies.', icon: <Clock size={32} /> },
    { id: 3, title: 'Seamless Pickup', desc: 'Arrive at the stop, skip the queue, and grab your fresh meal.', icon: <Truck size={32} /> },
];

const LandingPage = () => {
    const navigate = useNavigate();
    const [restaurants, setRestaurants] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [locationError, setLocationError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        requestGeolocation();
    }, []);

    const requestGeolocation = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude });
                    fetchNearbyRestaurants(latitude, longitude);
                },
                (error) => {
                    console.warn('Geolocation error:', error.message);
                    setLocationError(error.message);
                    fetchAllRestaurants();
                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
            );
        } else {
            setLocationError('Geolocation not supported');
            fetchAllRestaurants();
        }
    };

    const fetchNearbyRestaurants = async (lat, lng) => {
        try {
            setLoading(true);
            const response = await restaurantApi.getNearbyRestaurants(lat, lng, 500); // Increased radius
            const nearbyData = response.data.data || [];
            
            // If no nearby restaurants, fallback to all restaurants
            if (nearbyData.length === 0) {
                await fetchAllRestaurants();
            } else {
                setRestaurants(nearbyData);
                setLoading(false);
            }
        } catch (error) {
            console.error('Failed to fetch nearby restaurants:', error);
            fetchAllRestaurants();
        }
    };

    const fetchAllRestaurants = async () => {
        try {
            setLoading(true);
            const response = await restaurantApi.searchRestaurants(null, null);
            setRestaurants(response.data.data || []);
        } catch (error) {
            console.error('Failed to fetch restaurants:', error);
        } finally {
            setLoading(false);
        }
    };

    // Map restaurants to food card format
    const restaurantFoods = restaurants.slice(0, 4).map((restaurant, index) => ({
        id: restaurant.id,
        name: restaurant.restaurantName,
        restaurant: restaurant.restaurantName,
        price: Math.floor(Math.random() * 300) + 200,
        rating: (4.5 + Math.random() * 0.5).toFixed(1),
        image: `https://images.unsplash.com/photo-${1500000000000 + index * 1000}?q=80&w=1500&auto=format&fit=crop`
    }));

    return (
        <div className="landing-page auth-page-global-bg">
            {/* Premium Interactive Background */}
            <div className="bg-mesh"></div>
            <div className="bg-vignette"></div>

            <Hero />

            {/* Explore Meals Section */}
            <section id="explore-meals" className="explore-meals-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge gold-text">Curated Selection</span>
                        <h2 className="section-title">Explore <span className="gradient-text">Delicious Meals</span></h2>
                        <p className="section-desc">Choose from our wide variety of cuisines to fuel your journey</p>
                    </div>

                    {/* Meal Categories */}
                    <div className="meal-categories-grid">
                        {mealCategories.map((category, index) => {
                            const IconComponent = category.icon;
                            return (
                                <div 
                                    key={category.id} 
                                    className="meal-category-card glass"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                    onClick={() => navigate('/destination')}
                                >
                                    <div className="category-image">
                                        <img src={category.image} alt={category.name} />
                                        <div className="category-overlay"></div>
                                    </div>
                                    <div className="category-content">
                                        <div className="category-icon" style={{ background: `${category.color}20`, color: category.color }}>
                                            <IconComponent size={24} />
                                        </div>
                                        <h3>{category.name}</h3>
                                        <span className="category-items">{category.items}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Popular Meals */}
                    <div className="popular-meals-section">
                        <div className="popular-header">
                            <h3>Popular Right Now</h3>
                            <button className="view-all-btn" onClick={() => navigate('/destination')}>
                                View All <ArrowRight size={16} />
                            </button>
                        </div>
                        <div className="popular-meals-grid">
                            {popularMeals.map((meal, index) => (
                                <div 
                                    key={meal.id} 
                                    className="popular-meal-card glass"
                                    style={{ animationDelay: `${index * 0.08}s` }}
                                >
                                    <div className="meal-image">
                                        <img src={meal.image} alt={meal.name} />
                                        <div className="meal-rating">
                                            <span>★</span> {meal.rating}
                                        </div>
                                    </div>
                                    <div className="meal-info">
                                        <h4>{meal.name}</h4>
                                        <div className="meal-meta">
                                            <span className="meal-price">₹{meal.price}</span>
                                            <span className="meal-time"><Clock size={12} /> {meal.time}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="how-it-works container animate-fade-in">
                <div className="section-header">
                    <span className="section-badge silver-text">Simple Operations</span>
                    <h2 className="section-title">Your Highway Meal, <span className="gradient-text">Simplified</span></h2>
                    <p className="section-desc">Experience the future of highway dining in three easy steps. No more waiting, no more low-quality food.</p>
                </div>
                <div className="steps-grid">
                    {steps.map((step, index) => (
                        <div key={step.id} className="step-card glass-card">
                            <div className="step-number">0{index + 1}</div>
                            <div className="step-glow"></div>
                            <div className="step-icon-wrapper">{step.icon}</div>
                            <h3>{step.title}</h3>
                            <p>{step.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="trending-section animate-fade-in">
                <div className="container">
                    <div className="section-header flex-row">
                        <div>
                            <span className="section-badge gold-text">{userLocation ? 'Near You' : 'Trending Now'}</span>
                            <h2 className="section-title">{userLocation ? 'Nearest ' : 'Most Ordered '}<span className="gradient-text">Restaurants</span></h2>
                            {userLocation && (
                                <p className="location-info">
                                    <Navigation size={14} /> Location detected
                                </p>
                            )}
                        </div>
                        <button className="landing-btn-secondary glass-button" onClick={() => window.location.href = '/destination'}>
                            View All
                        </button>
                    </div>

                    {loading ? (
                        <div className="loading-container">
                            <p>Loading restaurants...</p>
                        </div>
                    ) : (
                        <div className="food-grid">
                            {(restaurantFoods.length > 0 ? restaurantFoods : trendingFoods).map(food => (
                                <FoodCard key={food.id} {...food} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section className="cta-section container">
                <div className="cta-card glass">
                    <div className="cta-content">
                        <h2>Ready for a better journey?</h2>
                        <p>Join thousands of travelers who never settle for mediocre highway food.</p>
                        <div className="cta-actions">
                            <button className="landing-btn-primary">Start Your Journey</button>
                            <button className="landing-btn-secondary">Download App</button>
                        </div>
                    </div>
                    <div className="cta-visual">
                        <ShieldCheck size={120} className="cta-icon" />
                    </div>
                </div>
            </section>

            <footer className="footer-premium">
                <div className="container footer-grid">
                    <div className="footer-brand">
                        <Logo size={36} className="logo-large" />
                        <p>
                            Your ultimate companion for highway food discovery.
                            Pre-order meals from the best rest stops along your route.
                        </p>
                        <div className="footer-socials">
                            <a href="#" className="social-icon" aria-label="Twitter">𝕏</a>
                            <a href="#" className="social-icon" aria-label="Instagram">📸</a>
                            <a href="#" className="social-icon" aria-label="LinkedIn">in</a>
                        </div>
                    </div>
                    <div className="footer-links-group">
                        <div className="link-col">
                            <h4>Company</h4>
                            <a href="/about">About Us</a>
                            <a href="#">Careers</a>
                            <a href="#">Press</a>
                            <a href="#">Blog</a>
                        </div>
                        <div className="link-col">
                            <h4>Support</h4>
                            <a href="#">Help Center</a>
                            <a href="#">Safety</a>
                            <a href="#">Contact Us</a>
                            <a href="#">Partners</a>
                        </div>
                    </div>
                </div>
                <div className="footer-divider"></div>
                <div className="footer-bottom">
                    <p>&copy; 2026 PikNGo Inc. All rights reserved.</p>
                    <div className="legal-links">
                        <a href="#">Privacy</a>
                        <a href="#">Terms</a>
                        <a href="#">Cookies</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
