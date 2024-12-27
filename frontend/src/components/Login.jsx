import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [mobileNo, setMobileNo] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/login', { mobileNo });
            if (response.status === 200) {
                alert('Login Successful!');
                navigate('/home'); // Redirect to home after successful login
            } else {
                alert(response.data.message || 'Login Failed');
            }
        } catch (error) {
            alert(error.response?.data?.message || 'An error occurred. Please try again.');
        }
    };
    return (
        <div className="form-container">
            <div className="form-card">
                <h2 className="form-title">Login</h2>
                <form onSubmit={handleLogin} className="form-fields">
                    <div className="input-group">
                        <label htmlFor="mobileNo">Mobile No</label>
                        <input
                            type="text"
                            id="mobileNo"
                            name="mobileNo"
                            placeholder="Enter your mobile number"
                            value={mobileNo}
                            onChange={(e) => setMobileNo(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn">Login</button>
                </form>
                <p className="toggle-text">
                    Don't have an account?{' '}
                    <span
                        className="toggle-link"
                        onClick={() => navigate('/signup')}
                    >
                        Signup
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
