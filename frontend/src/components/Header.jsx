import React from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Ensure axios is imported
import womenLogo from '../assets/womenLogo.png';
import { Link } from 'react-router-dom';
const Header = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            const response = await axios.post("http://localhost:8000/logout", {}, {
                withCredentials: true, // Include cookies
            });
            if (response.status === 200) {
                alert("Logout Successful!");
                navigate("/"); // Redirect to landing page
            }
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred during logout.");
        }
    };

    const sendSOSAlert = async () => {
        try {
            const response = await axios.post("http://localhost:8000/send-sos", {}, { withCredentials: true });
            alert(response.data.message); // Show success message
        } catch (error) {
            alert("Failed to send SOS alert.");
        }
    };


    return (
        <header>

            {/* Logo */}
            <div className="logo">
                <img src={womenLogo} alt="Women Safety Logo" style={{ height: '50px' }} />
                <h1>Women Safety</h1>
            </div>

            {/* Navigation Menu */}
            <nav>
                <ul>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/emergency-contacts">Emergency Contacts</Link></li>
                    <li><Link to="/location">Location</Link></li>
                    <li>
                        <button
                            onClick={handleLogout}
                            style={{ all: 'unset', cursor: 'pointer', textDecoration: 'no-underline' }}>LogOut</button>
                    </li>
                </ul>
            </nav>
            {/* Emergency SOS Button */}
            <div className="sos-button">
                <button onClick={sendSOSAlert}>
                    SOS Emergency
                </button>
            </div>
        </header>
    );
}

export default Header
