import React from 'react';
import CalcTextBox from '../components/CalcTextBox';
import logo from '../logo.svg';
import './Calculator.css';

function Calculator() {
  return (
    <div className="Calculator">

      <div className="display">
        <div className='costBox' id='cRight'></div>
        <div className='costBox' id='cLeft'></div>
        <CalcTextBox/>
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
            <button key={digit} className="digit-button">
              {digit}
            </button>
          ))}
        </div>
        
        <div className="operators-container">
          {['÷', '×', '−', '+'].map((operator) => (
            <button key={operator} className="digit-button">
              {operator}
            </button>
          ))}
        </div>
        
      </div>

    </div>
  );
}

export default Calculator;
