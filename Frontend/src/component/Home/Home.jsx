import React from 'react';
import './Home.css';
import image from '../../assets/profile1.png';

const Home = () => {
    return (
        <div className="home-container">
            <div className="profile-img">
                <img src={image} alt="Anurag Kumar" />
            </div>
            <div className="text">
                <div className="home-wrapper">
                    <span className="loader"></span>
                    <h3>Available For Paid Projects</h3>
                </div>
                <h2 className="fade-in">Hey, I am</h2> <br />
                <h3 className="fade-in"><span className='name'>Anurag</span> Kumar</h3>
                <br />
                <h4 className="fade-in">MERN Stack Developer | Building scalable and efficient web applications with a passion for innovative solutions.</h4>
                <h4 className="fade-in">Let's create something amazing together. Collaborations and teamwork are my jam.</h4>
                <button className='home-btn fade-in'>Hire Me</button>
            </div>
        </div>
    );
};

export default Home;
