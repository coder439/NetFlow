import logo from './netflowlogo.png';
import './App.css';
import MyButton from './Button'
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Expenses from "./expenses";
import './Header.css'

function App() {
    const handleClick = () => {

    }
  return (
    <div className="App">

        <Routes>
            <Route path="/homepage" element={<App />} /> {/* Add this route */}
            <Route path="/expenses" element={<Expenses />} /> {/* Add this route */}
        </Routes>
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

export default App;
