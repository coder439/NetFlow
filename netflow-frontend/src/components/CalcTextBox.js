import React, { useState } from 'react';
import '../pages/Calculator.css';

function CalcTextBox() {
  const [userInput, setUserInput] = useState('TEST:5+5=10');

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <div className="typeBox">
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        className="input-box"
      />
      <p className="type">{userInput}</p>
    </div>
  );
}

export default CalcTextBox;
