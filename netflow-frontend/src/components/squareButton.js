import React from 'react';
import './squareButton.css';


function squareButton({ label, onClick }) {
  return (
    <button type="button" onClick={onClick}>{label}</button>
  );
}

export default squareButton;
