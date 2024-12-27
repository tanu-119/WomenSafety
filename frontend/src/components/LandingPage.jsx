import React from 'react';
import { Link } from 'react-router-dom';
import landingImage from '../assets/landingImage.jpg';
import Signup from './Signup';

const LandingPage = () => {
    return (
        <div className="landing-container">
            <p className='women-safety-title'>Women Safety</p>
            <div className="image-content-container">
                <div className="image-container">
                    <img src={landingImage} alt="Landing" />
                </div>
                <div className="content-container">
                    <p>
                        Women’s safety is an important issue, and it's essential for women to have resources that help them stay safe.
                        This <b>Women Safety</b> website is created to provide tools that women can use in emergencies.
                        It includes features like an SOS button to alert emergency contacts, information about local authorities, and safety tips.
                        The website also shares helpful advice on self-defense and legal rights, so women know how to protect themselves.
                        By offering easy access to important resources, this website helps women feel safer and more confident in their daily lives.
                    </p>
                    <Link to="/signup">
                        <button className="login-signup-btn">Login / SignUp</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
