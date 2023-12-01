import React, { useState, useEffect } from 'react';
import SquareButton from '../components/squareButton';
import ExpenseTab from '../components/expenseTab';
import './Expenses.css';
import { Outlet, Link } from "react-router-dom";
import ExpensesDropdown from '../components/ExpensesDropdown';
import Spinner from 'react-bootstrap/Spinner';

function Expenses() {
  const [transactions, setTransactions] = useState([])
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const handleSelectCategory = (selectedCategory) => {
    if (selectedCategory === "All"){
      setFilteredTransactions(transactions)
      return
    }
    const filtered = transactions.filter(transaction => 
      transaction.category.includes(selectedCategory)
    );
    setFilteredTransactions(filtered);
  };
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
      setLoading(false);
    }
    fetchData();
  }, []);
  // Extract categories from transactions
  const categories = transactions.map(transaction => transaction["category"]);
  const flattenedCategories = categories.flatMap(category => category);
  // Remove duplicates from categories
  let uniqueCategories = Array.from(new Set(flattenedCategories));
  uniqueCategories = ["All", ... uniqueCategories]
  const dataToRender = filteredTransactions.length > 0 ? filteredTransactions : transactions;

console.log("test")
console.log(uniqueCategories)
console.log(transactions)
const data = dataToRender.map((transaction, index) => (
  <ExpenseTab key={index} expense={transaction.name} date={transaction.date} cost={transaction.amount} necessity={4} color="orange" />
));

return (
  <div className="Expenses" style={{color:'white'}}>
    <header className="Expenses-header">
      <p id='title'>Expenses</p>

      {loading ? (
        <div className="spinner-container"> {/* Use the container class here */}
        <Spinner animation="border" role="status" style={{backgroundColor:'white'}}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
      ) : (
        <>
          <ExpensesDropdown categories={uniqueCategories} onSelectCategory={handleSelectCategory} inputTitle="Expense Category"/>
          <div id='tabs-container' style={{color:'black', fontSize:'medium'}}>
            <b>{data}</b>
          </div>
        </>
      )}
    </header>
  </div>
);
}

export default Expenses;
