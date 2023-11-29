import React from 'react';
import HomeButton from './components/homeButton';
import logo from './logo.svg';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './index.css';
import Layout from './components/Layout.js'
import Welcome from './pages/Welcome.js'
import Expenses from './pages/Expenses.js'
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar.js';
import Calculator from './pages/Calculator';
import Goals from './pages/Goals';
import './App.css';

function App() {
  return (
    <div>
      <header>
        <BrowserRouter>
          {/*<HomeButton/>*/}
        </BrowserRouter>
        


        <BrowserRouter >
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="expenses" element={<Expenses />} />
              <Route path="calculator" element={<Calculator />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="goals" element={<Goals />} />
              <Route path="*" element={<Welcome />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </header>

      <header className="Router">
        
      </header>
    </div>
  );
}

export default App;
