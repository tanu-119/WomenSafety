import React, { useState, useEffect } from "react";

const LocationPage = () => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                    setLoading(false);
                    console.log(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
                },
                (error) => {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            setError("Permission denied. Please enable location access.");
                            break;
                        case error.POSITION_UNAVAILABLE:
                            setError("Position unavailable. Please try again later.");
                            break;
                        case error.TIMEOUT:
                            setError("Location request timed out. Please try again.");
                            break;
                        default:
                            setError("An unknown error occurred while fetching your location.");
                    }
                    setLoading(false);
                },
                { enableHighAccuracy: true }
            );
        } else {
            setError("Geolocation is not supported by your browser.");
            setLoading(false);
        }
    }, []);

    return (
        <div>
            <h2>Your Current Location</h2>
            {loading && <p>Loading your location...</p>}
            {error && <p>{error}</p>}
            {!error && latitude && longitude && !loading && (
                <div className="map-container">
                    <iframe
                        title="Google Maps showing your location"
                        src={`https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default LocationPage;
