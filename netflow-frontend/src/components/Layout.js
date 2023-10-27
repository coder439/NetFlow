import React from 'react';
import HomeButton from './homeButton';
import logo from '../logo.svg';
import { Outlet, Link } from "react-router-dom";
import './Layout.css'

function Layout() {
  return (
    <div className="Layout">
      <header className="Layout-header">

        <nav>
          <ul>
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
