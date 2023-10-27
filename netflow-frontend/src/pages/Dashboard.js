import React from 'react';
import HomeButton from '../components/homeButton';
import logo from './netflowlogo.png';

import './Dashboard.css';
import MyButton from '../components/Button'
import { Link } from 'react-router-dom';

function Dashboard() {
  const handleClick = () => {

  }
  return (
    <div className="Dashboard">
      <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className = "Name"><b>NetFlow</b></div>
      </header>
    <p className ='first-line'>
        <b>Welcome to NetFlow!</b>
    </p>
    <p>
        <b>Your All In One Financial Solution</b>
    </p>
    <div className = "button">
        <Link to='/expenses'>
            <MyButton text="Get Started" onClick={handleClick} /> {}
        </Link>
    </div>
    </div>
  );
}

export default Dashboard;
