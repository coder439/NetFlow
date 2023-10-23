import React from 'react';
import './expenses.css';
import './Header.css'
import logo from "./netflowlogo.png";
function Expenses() {
    return (

        <div className='expenses-home'>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <div className = "Name"><b>NetFlow</b></div>
            </header>
            <h1>Expenses</h1>
            <p>Hello World!</p>
        </div>
    );
}

export default Expenses;