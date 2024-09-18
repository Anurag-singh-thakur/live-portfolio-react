import React from 'react';
import './Home.css'
import image from '../../assets/profile1.png'
const Home = () => {
    return (
        <div className="home-container">
            <div className="profile-img">
                <img src={image} alt="Anurag Kumar" />
            </div>
          
            <div className="text">
            <div className="home-wrapper">
            <span class="loader"></span>
            <h3>Available For Paid Projects </h3>
                 </div>
                <h2>Hey , I am</h2> <br />
                <h3 ><span className='name'>Anurag</span>Kumar</h3>
                <br />
                <h4>MERN Stack Developer | Building scalable and efficient web applications with a passion for innovative solutions.</h4>
                <h4>Let's create something amazing together. Collaborations and teamwork are my jam</h4>
                <button className='home-btn'>Hire Me</button>
            </div>

        </div>
    );
};

export default Home;