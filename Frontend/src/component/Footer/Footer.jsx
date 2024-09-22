import React from 'react';
import './Footer.css';
import { FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';
import { useTheme } from '../../storeContext/themeContext';
const Footer = () => {
  const { isDarkMode } = useTheme();
  return (
    <footer className={`footer ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="footer-container">
        <div className="footer-section  footer-get-in-touch">
          <h4>Contact</h4>
          <p>thakuranurag0987@gmail.com</p>
          <p>singhanurag1309@gmail.com</p>
        </div>

        <div className="footer-section">
          <h4>Get in Touch</h4>
          <div className="social-icons">
            <a href="https://github.com/Anurag-singh-thakur" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://instagram.com/4nurag_rajput" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://twitter.com/anurags013" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Services</h4>
          <ul>
            <li>Frontend Development</li>
            <li>Backend Development</li>
            <li>Full Stack Development</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Address</h4>
          <p> 282001<br />Agra, India</p>
        </div>
        <div className="footer-section">
          <h4 className='coding-profiles'>Coding Profiles</h4>
          <ul>
            <a href="https://leetcode.com/u/anurag_rajput_013/" target="_blank"><li>Leetcode</li></a>
            <a href="https://codolio.com/profile/anurag_rajput" target="_blank"><li>CodeStudio</li></a>
            <a href="https://www.naukri.com/code360/profile/anuragrajput" target="_blank"><li>Codolio</li></a>


          </ul>

        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Anurag Kumar. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
