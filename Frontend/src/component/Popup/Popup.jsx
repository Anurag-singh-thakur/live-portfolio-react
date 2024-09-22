import React from 'react';
import './Popup.css';

const Popup = ({ message, onClose, isError }) => {
  return (
    <div className="popup-overlay">
      <div className={`popup ${isError ? 'error' : 'success'}`}>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;