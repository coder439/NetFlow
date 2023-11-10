import React, { useState } from 'react';
import SquareButton from '../components/squareButton';
import ExpenseTab from '../components/expenseTab';
import './Expenses.css';
import { Outlet, Link } from "react-router-dom";

function Expenses() {
  const addExpense = () => {
    const j = {
      expense: "Grocery Shopping",
      date: new Date("5/11/2023"),
      location: "Walmart",
      cost: 89.43,
      necessity: 4,
      planned: true,
    };
    expenseArray.push(j)
  };

  let expenseArray = [];
  addExpense();
  addExpense();
  addExpense();

  const tabs = [
    <ExpenseTab key={0} expense="Grocery Shopping" date="5/11/2023" location="Walmart" cost="89.43" necessity={4} planned="True" color="purple" />,
    <ExpenseTab key={1} expense="Dining Out" date="5/12/2023" location="Restaurant" cost="45.99" necessity={3} planned="False" color="green" />,
    <ExpenseTab key={2} expense="Gasoline" date="5/13/2023" location="Gas Station" cost="60.75" necessity={5} planned="True" color="blue" />,
    // Add more tabs with different colors as needed
  ];
  

  return (
    <div className="Expenses">
      <header className="Expenses-header">
        <p id='title'>Expenses</p>
        <div id='lbutton-container'>
          <SquareButton onClick = {addExpense} label = "ADD NEW EXPENSE" />
        </div>
        
        <div id='rbutton-container'>
          <SquareButton onClick = {addExpense} label = "SORT BY" />
        </div>

        <div id='tabs-container'>
          {tabs}
        </div>

      </header>
    </div>
  );
}

export default Expenses;
