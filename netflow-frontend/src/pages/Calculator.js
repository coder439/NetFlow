import React, { useState, useEffect } from 'react';
import logo from '../logo.svg';
import './Calculator.css';

function Calculator() {
  

  const handleButtonClick = (value) => {
    setUserInput((prevInput) => prevInput + value);
  };

  const handleType = (event) => {
    setUserInput(event.target.value);
  };

  const handleDelete = () => {
    setUserInput((prevInput) => prevInput.slice(0, -1));
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const inputElement = document.getElementById('input');
      inputElement.focus();
      const textLength = inputElement.value.length;
      inputElement.setSelectionRange(textLength, textLength);

      if (event.key == 'Enter') 
      {
          str = inputElement.value;
          cntr = 0
          for (let i = 0; i < str.length; i++) {
            const currentChar = myString[i];
            console.log(currentChar);

          historyArr.push(str);
          setUserInput('');
          console.log(historyArr);
          }
      };
    };

    document.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const [userInput, setUserInput] = useState('');
  const [historyArr, setHistoryArr] = useState(['','','','']);
  
  return (
    <div className="Calculator">

      <div className="display">
          <div className="histBox">
            {[4,3,2,1].map((histNum) => (
              <h2 key={histNum} className='histLine'>{historyArr[historyArr.length-histNum]}</h2>
            ))}
          </div>
          

          <div className="histBox2">
            {[4,3,2,1].map((histNum) => (
              <h2 key={histNum} className='histLine'>{historyArr[historyArr.length-histNum]}</h2>
            ))}
          </div>

        <div className='costBox' id='cRight'></div>
        <div className='costBox' id='cLeft'></div>

        <input id ="input" type="text" 
          value={userInput} onChange={handleType}
        />
      </div>


      <div className='buttons-container'>
        <div className="setters-container">
          <button className="set-button">Create New Variable</button>
          <button className="set-button"> Create New Function</button>
        </div>

         <div className="versions-container">
           <button className="vers-button" id = 'undo'>↩</button>
           <button className="vers-button" id = 'redo'>↪</button>
         </div>

        <div className="variables-container">
          <button className="var-button" id='red'></button>
          <button className="var-button" id='blue'></button>
          <button className="var-button" id='yellow'></button>
          <button className="var-button" id='green'></button>
        </div>  
        
        <div className='digits-container'>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
            <button key={digit} onClick={() => handleButtonClick(String(digit))} className="digit-button">
              {digit}
            </button>
          ))}
        </div>
        
        <div className="operators-container">
          {['÷', '×', '−', '+'].map((operator) => (
            <button key={operator} onClick={() => handleButtonClick(operator)} className="digit-button">
              {operator}
            </button>
          ))}
        </div>
        
      </div>

    </div>
  );
}

export default Calculator;