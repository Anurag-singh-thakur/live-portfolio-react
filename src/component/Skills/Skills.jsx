import React, { useState, useEffect } from 'react';
import './Skills.css';
import python from '../../assets/python.png';
import bootstrap from '../../assets/bootstrap.jpg';
import c from '../../assets/c.png';
import cpp from '../../assets/c++.png';
import express from '../../assets/express-js.png';
import html from '../../assets/html.png';
import mongodb from '../../assets/mongodb.png';
import nodejs from '../../assets/nodejs.png';
import react from '../../assets/react.png';
import js from '../../assets/js.png';
import socket from '../../assets/socket.png';
import tailwinds from '../../assets/tailwinds.png';
import git from '../../assets/git.png';
import github from '../../assets/github.png';
import { useTheme } from '../../storeContext/themeContext';
import discord from '../../assets/discord.jpeg';
const Skills = () => {
  const [showBottom, setShowBottom] = useState(false);
  const { isDarkMode } = useTheme();

  const handleScroll = () => {
    if (window.scrollY > window.innerHeight / 2) {
      setShowBottom(true);
      window.removeEventListener('scroll', handleScroll);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`skills-container ${isDarkMode ? 'dark' : 'light'}`}>
      <div className={`skills-container-top ${isDarkMode ? 'dark-mode' : ''}`}>
        <h1 className='skills'>Skills</h1>
        <div className="skills-logo">
          <div className="skills-img"><img src={python} alt="Python" /></div>
          <div className="skills-img"><img src={bootstrap} alt="Bootstrap" /></div>
          <div className="skills-img"><img src={html} alt="HTML" /></div>
          <div className="skills-img"><img src={c} alt="C" /></div>
          <div className="skills-img"><img src={cpp} alt="C++" /></div>
          <div className="skills-img"><img src={nodejs} alt="Node.js" /></div>
          <div className="skills-img"><img src={react} alt="React" /></div>
          <div className="skills-img"><img src={mongodb} alt="MongoDB" /></div>
          <div className="skills-img"><img src={express} alt="Express" /></div>
          <div className="skills-img"><img src={tailwinds} alt="Tailwind CSS" /></div>
          <div className="skills-img"><img src={js} alt="JavaScript" /></div>
          <div className="skills-img"><img src={socket} alt="Socket.io" /></div>
          <div className="skills-img"><img src={git} alt="Git" /></div>
          <div className="skills-img"><img src={github} alt="GitHub" /></div>
        </div>
      </div>
      <div className="skills-container-bottom" style={{ display: showBottom ? 'block' : 'none' }}>
        <div className="discord-section">
          <h2 className="discord-header">Join Our Community on Discord!</h2>
          <p className="discord-description">Connect, collaborate, and chat with fellow developers!</p>
          <a href="https://discord.gg/wk9Ceuuf" className="discord-button" target='_blank'>Join Now!</a>
          <div className="discord-illustration">
            <img src={discord} alt="Discord Illustration" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Skills;
