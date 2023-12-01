import React, { useState, useEffect } from 'react';
import 'mathjs';
import logo from '../logo.svg';
import './Calculator.css';
import { expression } from 'mathjs';

function Calculator() {
    const [userInput, setUserInput] = useState('');
    const [historyArrL, setHistoryArrL] = useState(['','','','']);
    const [historyArrR, setHistoryArrR] = useState(['','','','']);
    const [funcArrayR, setfuncArrayR] = useState([]);
    const [funcArrayB, setfuncArrayB] = useState([]);
    const [varArrayY, setVarArrayY] = useState([]);
    const [varArrayG, setVarArrayG] = useState([]);
    const [totalL, setTotalL] = useState(0.00);
    const [totalR, setTotalR] = useState(0.00);
    const [right, setRight] = useState(true);
    const [createFunc, setCreateFunc] = useState(false);
    const [createVar, setCreateVar] = useState(false);
    const [isOpenR, setIsOpenR] = useState(false);
    const [isOpenB, setIsOpenB] = useState(false);
    const [isOpenY, setIsOpenY] = useState(false);
    const [isOpenG, setIsOpenG] = useState(false);
    const [customContext, setCustomContext] = useState({});

    const handleButtonClick = (value) => {
        const inputElement = document.getElementById('input');

        var curPos = inputElement.selectionStart;

        setUserInput((prevInput) => prevInput.slice(0, curPos) + value + prevInput.slice(curPos));

        curPos = inputElement.selectionStart;
        inputElement.setSelectionRange(curPos + value.length, curPos + value.length);
        inputElement.focus();
    };

    const handleType = (event) => {
        setUserInput(event.target.value);
    };

    const togVar = () => {
        setCreateVar((prevVal) => !prevVal);
    };

    const togFunc = () => {
        setCreateFunc((prevVal) => !prevVal);
    };

    const toggleDropdown = (num) => {
        if (num == 1)
            setIsOpenR(prevIsOpen => !prevIsOpen);
        else if (num == 2)
            setIsOpenB(prevIsOpen => !prevIsOpen);
        else if (num == 3)
            setIsOpenY(prevIsOpen => !prevIsOpen);
        else
            setIsOpenG(prevIsOpen => !prevIsOpen);
    };

    const handleEnter = () => {
        const keyPress = new KeyboardEvent('keydown', {
            key: 'Enter'
        });
        handleKeyDown(keyPress);
    };


    const handleDelete = () => {
        setUserInput((prevInput) => prevInput.slice(0, -1));
    };

    const handleKeyDown = (event) => {

        console.log(event.key);
        const inputElement = document.getElementById('input2');
        inputElement.focus();
        if (event.key === 'Enter')
        {
            const math = require('mathjs');
            let str = inputElement.value;
            str = str.replace(/\s/g, '');
            if (!createVar && !createFunc)
            {

                str = str.replace(/÷/g,'/');
                str = str.replace(/×/g,'*');



                const res = math.evaluate(str, customContext);

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
            }
            else if (createFunc)
            {
                const fParenInd = str.indexOf('(');
                const sParenInd = str.indexOf(')');

                var funcName = str.slice(0, fParenInd);
                var params = str.slice(fParenInd+1, sParenInd)
                const paramsArray = params.split(',');

                str = str.slice(sParenInd + 2);

                setCustomContext({...customContext, [funcName]:
                        (...args) => {
                            var expr = str;
                            var pArray = paramsArray;

                            for (let i = 0; i < args.length; i++)
                            {
                                console.log(expr);
                                expr = expr.split(pArray[i]).join(args[i]);
                                console.log(expr);
                            }

                            return math.evaluate(expr, customContext);
                        }
                });


                const newFunc = [funcName, str];
                setfuncArrayR((prevVal) => [...prevVal, newFunc]);
            }
            else
            {
                const equalInd = str.indexOf('=');
                const varName = str.slice(0,equalInd);
                const varValStr = str.slice(equalInd+1);
                const varVal = math.evaluate(varValStr, customContext);

                setCustomContext({...customContext, [varName]: varVal});

                const newVar = [varName, varVal];
                setVarArrayY((prevVal) => [...prevVal, newVar]);
            }
            setUserInput('');
        };
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [right, createFunc, createVar, customContext]);

    useEffect(() => {
        const handleSideSwitch = (event) => {
            const mouseX = event.pageX;
            const mouseY = event.pageY;

            if (mouseX <= 720 && mouseX >= 247 && mouseY <= 437 && mouseY >= 57) {
                setRight((prevRight) => false);
                console.log(customContext);

            }
            else if (mouseX >= 720 && mouseX <= 1130 && mouseY <= 437 && mouseY >= 57) {
                setRight((prevRight) => true);
                console.log(funcArrayB);
            }

        };

        document.addEventListener('click', handleSideSwitch);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleSideSwitch);
        };
    }, [right, funcArrayB, funcArrayR, varArrayG, varArrayY, createFunc, customContext]);



    return (
        <div className="Calculator" style={{transform:'scale(0.7)'}}>

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


                <input id ="input2" type="text"
                       value={userInput} onChange={handleType}
                       style={{textAlign: right ? 'right' : 'left'}}
                />
            </div>

            <div className='buttons-container'>
                <div className="setters-container">
                    <button onClick={() => togVar()} className="set-button"
                            style={{color: createVar ? "red":"black"}} >Create New Variable</button>

                    <button onClick={() => togFunc()} className="set-button"
                            style={{color: createFunc ? "red":"black"}}> Create New Function</button>
                </div>

                <div className="versions-container">
                    <button className="vers-button" id = 'undo'>↩</button>
                    <button className="vers-button" id = 'redo'>↪</button>
                </div>

                <div className="submit-container">
                    <button onClick={() => handleDelete()} className="vers-button" id = 'delete'>↤</button>
                    <button onClick={() => handleEnter()} className="vers-button" id = 'enter'>↦</button>
                </div>

                <div className="variables-container2">
                    <div className="var-button" id='red' onClick={() => toggleDropdown(1)}>
                        <div className={`dropdown-toggle ${isOpenR ? 'open' : ''}`} >
                            ^
                        </div>
                    </div>
                    {isOpenR && (
                        <div className="dropdown-menu2">
                            {funcArrayR.map((option, index) => (
                                <div key={index} onClick={() => handleButtonClick(option[0])}className="dropdown-item2" id='red' style={{ bottom: `${index * 40}px`, zIndex:{index} }}>
                                    {option[0]}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="var-button" id='blue' onClick={() => toggleDropdown(2)}>
                        <div className={`dropdown-toggle ${isOpenB ? 'open' : ''}`} >
                            ^
                        </div>
                    </div>
                    {isOpenB && (
                        <div className="dropdown-menu2">
                            {funcArrayB.map((option, index) => (
                                <div key={index} onClick={() => handleButtonClick(option[0])} className="dropdown-item2" id='blue' style={{left:'105px', bottom: `${index * 40}px`, zIndex:{index} }}>
                                    {option[0]}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="var-button" id='yellow' onClick={() => toggleDropdown(3)}>
                        <div className={`dropdown-toggle ${isOpenY ? 'open' : ''}`} >
                            ^
                        </div>
                    </div>
                    {isOpenY && (
                        <div className="dropdown-menu2">
                            {varArrayY.map((option, index) => (
                                <div key={index} onClick={() => handleButtonClick(option[0])}className="dropdown-item2" id='yellow' style={{left:'210px', bottom: `${index * 40}px`, zIndex:{index} }}>
                                    {option[0]}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="var-button" id='green' onClick={() => toggleDropdown(4)}>
                        <div className={`dropdown-toggle ${isOpenG ? 'open' : ''}`} >
                            ^
                        </div>
                    </div>
                    {isOpenG && (
                        <div className="dropdown-menu2">
                            {varArrayG.map((option, index) => (
                                <div key={index} onClick={() => handleButtonClick(option[0])}className="dropdown-item" id='green' style={{left:'325px', bottom: `${index * 40}px`, zIndex:{index} }}>
                                    {option[0]}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className='sideDigits'>
                    <button onClick={() => handleButtonClick('(')} className='digit-button'>(</button>
                    <button onClick={() => handleButtonClick(')')} className='digit-button'>)</button>
                    <button onClick={() => handleButtonClick('0')} className='digit-button'>0</button>
                    <button onClick={() => handleButtonClick('^')} className='digit-button'>^</button>
                    <button onClick={() => handleButtonClick('%')} className='digit-button'>%</button>
                    <button onClick={() => handleButtonClick('.')} className='digit-button'>.</button>
                </div>


                <div className='digits-container'>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
                        <button key={digit} onClick={() => handleButtonClick(String(digit))} className="digit-button">
                            {digit}
                        </button>
                    ))}
                </div>

                <div className="operators-container" style={{position:'absolute',left:'50%'}}>
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
