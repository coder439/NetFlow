import React from 'react';
import HomeButton from './homeButton';
import { Outlet, Link } from "react-router-dom";

import './Layout.css'
import logo from '../pages/netflowlogo.png'
import homeImg from './images/home.png'
import calculator from './images/calculator.png'
import dashboard from './images/dashboard.png'
import goals from './images/goals.png'
import expenses from './images/expenses.png'

function Layout() {
  return (

    <div className="Layout" style={{display:'flex'}}>
        <div className="b-example-divider b-example-vr" style={{ top:'0', left:'0',position:"absolute", display:'flex', width:'2vw', height:'99vh', backgroundColor:'#222'}}></div>
      <header className="Layout-header">
        <nav>
          <ul>
              <div id="myTabsContainer" className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{height:'98vh',width: '17vw', display: 'flex',
                                                                                                                    backgroundColor:'#212529', overflowY:'hidden', overflowX:'hidden'
              }}>
                  <Link to="/"
                     className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                      <img src={logo} className="App-logo" alt="logo" style={{width:'25',height:'25'}}/>
                      <div className="Name" style={{fontSize:'large'}}><b>NetFlow</b></div>
                  </Link>
                  <hr style={{color:'white'}}></hr>
                      <ul className="nav nav-pills flex-column mb-auto">
                          <li className="nav-item">
                              <Link to="/" className="nav-link link-body-emphasis expand">
                                  <img class='less' src={homeImg} width="25" height="25" style={{marginRight:'5px'}}/>
                                  Welcome
                              </Link>
                          </li>
                          <li>
                              <Link to="/Welcome" className="nav-link link-body-emphasis expand">
                                  <img class='less' src={dashboard} width="25" height="25" style={{marginRight:'5px'}}/>
                                  Dashboard
                              </Link>
                          </li>
                          <li>
                              <Link to="/Expenses" className="nav-link link-body-emphasis expand">
                                  <img class='less' src={expenses} width="25" height="25" style={{marginRight:'5px'}}/>
                                  Expenses
                              </Link>
                          </li>
                          <li>
                              <Link to="/Calculator" className="nav-link link-body-emphasis expand">
                                  <img class='less' src={calculator} width="25" height="25" style={{marginRight:'5px'}}/>
                                  Calculator
                              </Link>
                          </li>
                          <li>
                              <Link to="/Goals" className="nav-link link-body-emphasis expand">
                                  <img class='less' src={goals} width="25" height="25" style={{marginRight:'5px'}}/>
                                  Goals
                              </Link>
                          </li>
                      </ul>
                  <hr style={{color:'white'}}></hr>
              </div>
          </ul>
        </nav>
          <div className="b-example-divider b-example-vr" style={{ top:'0', left:'20vw',position:"absolute", display:'flex', width:'2vw', height:'99vh', backgroundColor:'#222'}}></div>
          <div style={{ top:'0', left:'25vw',position:"absolute", display:'flex', width:'75vw'}}>
              {/* Content of your pages goes here */}
              <Outlet />
          </div>
      </header>
    </div>
  );
}

export default Layout;
