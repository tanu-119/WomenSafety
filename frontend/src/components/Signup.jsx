import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        mobileNo: '',
        address: '',
        gender: '',
        age: '',
        state: '',
        district: '',
        policeStation: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/signup', formData);
            if (response.status === 201) {
                alert('Signup Successful!');
                navigate('/home'); // Redirect to home after successful signup
            } else {
                alert(response.data.message || 'Signup Failed');
            }
        } catch (error) {
            alert(error.response?.data?.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="form-container">
            <div className="form-card">
                <h2 className="form-title">Signup</h2>
                <form onSubmit={handleSignup} className="form-fields">
                    {/* Name */}
                    <div className="input-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Address */}
                    <div className="input-group">
                        <label htmlFor="address">Address</label>
                        <textarea
                            id="address"
                            name="address"
                            placeholder="Enter your address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Gender */}
                    <div className="input-group">
                        <label htmlFor="gender">Gender</label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Age */}
                    <div className="input-group">
                        <label htmlFor="age">Age</label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            placeholder="Enter your age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* State */}
                    <div className="input-group">
                        <label htmlFor="state">State</label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            placeholder="Enter your state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* District */}
                    <div className="input-group">
                        <label htmlFor="district">District</label>
                        <input
                            type="text"
                            id="district"
                            name="district"
                            placeholder="Enter your district"
                            value={formData.district}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Police Station */}
                    <div className="input-group">
                        <label htmlFor="policeStation">Nearest Police Station</label>
                        <input
                            type="text"
                            id="policeStation"
                            name="policeStation"
                            placeholder="Enter nearest police station"
                            value={formData.policeStation}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Mobile No */}
                    <div className="input-group">
                        <label htmlFor="mobileNo">Mobile No</label>
                        <input
                            type="text"
                            id="mobileNo"
                            name="mobileNo"
                            placeholder="Enter your mobile number"
                            value={formData.mobileNo}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="submit-btn">Signup</button>
                </form>
                <p className="toggle-text">
                    Already have an account?{' '}
                    <span
                        className="toggle-link"
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Signup;
