import React, { useState, useEffect } from 'react';
import 'mathjs';
import logo from '../logo.svg';
import './Calculator.css';
import { expression } from 'mathjs';

function Calculator() {
  const [userInput, setUserInput] = useState('');
  const [historyArrL, setHistoryArrL] = useState(['','','','']);
  const [historyArrR, setHistoryArrR] = useState(['0','','','']);
  const [varArrayR, setVarArrayR] = useState([]);
  const [varArrayB, setVarArrayB] = useState([]);
  const [varArrayY, setVarArrayY] = useState([]);
  const [varArrayG, setVarArrayG] = useState([]);
  const [totalL, setTotalL] = useState(0.00);
  const [totalR, setTotalR] = useState(0.00);
  const [right, setRight] = useState(true);

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
      if (event.key === 'Enter') 
      {
          
          let str = inputElement.value;
          str = str.replace(/÷/g,'/');
          str = str.replace(/×/g,'*');

          const math = require('mathjs');
          const res = math.evaluate(str);

          if (right)
          {
            setTotalR((prevTotalR)=> prevTotalR+res);
          }
          else
          {
            setTotalL((prevTotalL)=> prevTotalL+res);
          }
          

          str = str.replace(/\//g,'÷');
          str = str.replace(/\*/g,'×');
          if (right)
          {
            setHistoryArrR((prevHistoryArrayR) => [...prevHistoryArrayR, str]);
          }
          else
          {
            setHistoryArrL((prevHistoryArrayL) => [...prevHistoryArrayL, str]);
          }
          
          setUserInput('');
      };
    };

    document.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [right]);

  useEffect(() => {
    const handleSideSwitch = (event) => {
      const mouseX = event.pageX;
      const mouseY = event.pageY;

      if (mouseX <= 720 && mouseX >= 247 && mouseY <= 437 && mouseY >= 57) {
          setRight((prevRight) => !prevRight);
          console.log(right);
          
      }
      else if (mouseX >= 720 && mouseX <= 1130 && mouseY <= 437 && mouseY >= 57) {
        setRight((prevRight) => !prevRight);
        console.log(right);
      }
      
    };

    document.addEventListener('click', handleSideSwitch);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleSideSwitch);
    };
  }, []);

  
  
  return (
    <div className="Calculator">

      <div className="display">
          <div className="histBox">
            {[4,3,2,1].map((histNum) => (
              <h2 key={histNum} className='histLine'>{historyArrL[historyArrL.length-histNum]}</h2>
            ))}
          </div>
          

          <div className="histBox2">
            {[4,3,2,1].map((histNum) => (
              <h2 key={histNum} className='histLine'>{historyArrR[historyArrR.length-histNum]}</h2>
            ))}
          </div>
          
        <div className='costBox' id='cLeft'>
              {totalL < 0 ? '-' : ''}${Math.abs(totalL).toFixed(2)}
        </div>
        <div className='costBox' id='cRight'>
              {totalR < 0 ? '-' : ''}${Math.abs(totalR).toFixed(2)}
        </div>
        

        <input id ="input" type="text" 
          value={userInput} onChange={handleType}
          style={{textAlign: right ? 'right' : 'left'}}
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

         <div className="submit-container">
           <button className="vers-button" id = 'delete'>↤</button>
           <button className="vers-button" id = 'enter'>↦</button>
         </div>

        <div className="variables-container">
          <button className="var-button" id='red'></button>
          <button className="var-button" id='blue'></button>
          <button className="var-button" id='yellow'></button>
          <button className="var-button" id='green'></button>
        </div>  

        <div className='sideDigits'>
          <button onClick={() => handleButtonClick('0')} className='digit-button'>0</button>
          <button onClick={() => handleButtonClick('.')} className='digit-button'>.</button>
        </div>
        
        
        <div className='digits-container'>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
            <button key={digit} onClick={() => handleButtonClick(String(digit))} className="digit-button">
              {digit}
            </button>
          ))}
        </div>
        
        <div className="operators-container">
          {['÷', '×', '-', '+'].map((operator) => (
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