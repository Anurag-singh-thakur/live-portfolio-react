import React, { useState } from 'react';
import './SecretKeyPopup.css';

const SecretKeyPopup = ({ onSubmit, onCancel }) => {
  const [secretKey, setSecretKey] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(secretKey);
  };

  return (
    <div className="secret-key-overlay">
      <div className="secret-key-popup">
        <h2>Enter Secret Key</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            placeholder="Enter secret key"
            required
          />
          <div className="button-group">
            <button type="submit">Submit</button>
            <button type="button" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SecretKeyPopup;