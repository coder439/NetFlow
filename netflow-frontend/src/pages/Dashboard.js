import React, {useState} from 'react';
import HomeButton from '../components/homeButton';
import logo from './netflowlogo.png';

import './Dashboard.css';
import MyButton from '../components/Button'
import { Link } from 'react-router-dom';
import './Dashboard.css'
/*this page is actually the welcome/home page do not listen to class file name*/
function Dashboard() {
    const handleClick = () => {

    }


    return (
        <div className="Dashboard">

            <p className='first-line'>
                <b>Welcome to NetFlow!</b>
            </p>
            <p>
                <b>Your All In One Financial Solution</b>
            </p>
                <Link to='/*'>
                    <MyButton text="Get Started" onClick={handleClick}/> {}
                </Link>

        </div>
    );

}
export default Dashboard;
