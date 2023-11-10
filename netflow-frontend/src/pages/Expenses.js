import React, { useState, useEffect } from 'react';
import SquareButton from '../components/squareButton';
import ExpenseTab from '../components/expenseTab';
import './Expenses.css';
import { Outlet, Link } from "react-router-dom";

function Expenses() {
  const [transactions, setTransactions] = useState([])
  async function getExpenses(){
    const url = "http://localhost:8080/transactionsInfo"; 
    const expenseData = await fetch(url)
    const data = await expenseData.json()
    return data 
  }
  useEffect(() => {
    async function fetchData() {
      const expenseData = await getExpenses(); 
      setTransactions(expenseData["transactions"]);
    }
    fetchData();
  }, []);

console.log(transactions)
const data = transactions.map((transaction, index) => <ExpenseTab key={index} expense={transaction["name"]} date = {transaction["date"]} cost={transaction["amount"]} necessity={4} color="orange" />)

  return (
    <div className="Expenses">
      <header className="Expenses-header">
        <p id='title'>Expenses</p>
        <div id='tabs-container'>
          {data}
        </div>

      </header>
    </div>
  );
}

export default Expenses;
