import React, { useContext } from 'react';
import './Navbar.css';
import Slider from '../Slider/Slider';
import { FaUserCircle, FaBars } from 'react-icons/fa';
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from '../../storeContext/themeContext';
import profile_image from '../../assets/logo.jpg'
const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isSliderOpen, setIsSliderOpen] = React.useState(false);

  const toggleSlider = () => {
    setIsSliderOpen(!isSliderOpen);
  };

  return (
    <div className={`navbar ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="navbar-left">
        {/* <FaUserCircle className="profile-icon"  /> */}
        <div >
          <img className='profile-icon' src={profile_image} alt="" />
        </div>
      </div>
      <div className="navbar-center">Anurag Kumar</div>
      <div className="navbar-right">
        {isDarkMode ? (
          <MdDarkMode onClick={toggleTheme} />
        ) : (
          <MdLightMode onClick={toggleTheme} />
        )}
        <FaBars onClick={toggleSlider} />
      </div>

      <Slider isOpen={isSliderOpen} toggleSlider={toggleSlider} />
    </div>
  );
};

export default Navbar;
