import React from 'react';
import './Slider.css';
import { FaTimes } from 'react-icons/fa';
import { useTheme } from '../../storeContext/themeContext';
import { Link } from 'react-router-dom';
const Slider = ({ isOpen, toggleSlider }) => {
  const { isDarkMode } = useTheme(); // Get the current theme state

  return (
    <div className={`slider ${isOpen ? 'open' : ''} ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="close-icon" onClick={toggleSlider}>
        <FaTimes />
      </div>
      <nav className="slider-nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/skills">Skills</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Slider;
