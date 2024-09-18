import React from 'react';
import './Slider.css';
import { FaTimes } from 'react-icons/fa';
import { useTheme } from '../../storeContext/themeContext';

const Slider = ({ isOpen, toggleSlider }) => {
  const { isDarkMode } = useTheme(); // Get the current theme state

  return (
    <div className={`slider ${isOpen ? 'open' : ''} ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="close-icon" onClick={toggleSlider}>
        <FaTimes />
      </div>
      <nav className="slider-nav">
        <ul>
          <li><a href="#option1">Home</a></li>
          <li><a href="#option2">Projects</a></li>
          <li><a href="#option3">Blog</a></li>
          <li><a href="#option3">Contact</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Slider;
