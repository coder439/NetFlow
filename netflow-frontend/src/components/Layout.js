import React from 'react';
import HomeButton from './homeButton';
import { Outlet, Link } from "react-router-dom";
import './Layout.css'
import logo from '../pages/netflowlogo.png'


function Layout() {
  return (
    <div className="Layout">
      <header className="Layout-header">
        <nav>
          <ul>
              <img src={logo} className="App-logo" alt="logo" />
              <div className = "Name"><b>NetFlow</b></div>
            <Link to="/" className='nav-link'>Dashboard</Link>
            <Link to="/Expenses" className='nav-link'>Expenses</Link>
            <Link to="/Calendar" className='nav-link'>Calendar</Link>
            <Link to="/Calculator" className='nav-link'>Calculator</Link>
            <Link to="*" className='nav-link'>Welcome</Link>
          </ul>
      </nav>

      <Outlet />
      </header>
    </div>
  );
}

export default Layout;
