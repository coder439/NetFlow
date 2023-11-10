import React from 'react';

function squareButton({ label, onClick }) {
  return (
    <button type="button" onClick={onClick}>{label}</button>
  );
}

export default squareButton;
