import React, { useState, useEffect } from 'react';
import HomeButton from '../components/homeButton';
import logo from '../logo.svg';
import './Calendar.css';
import ExpensesDropdown from '../components/ExpensesDropdown';
import Spinner from 'react-bootstrap/Spinner';
import FinancialGoalProgressBar from '../components/FinancialGoalProgressBar';

function Goals() {
    const [transactions, setTransactions] = useState([])
    const [accounts, setAccounts] = useState([])
    const [loading, setLoading] = useState(true); // Add a loading state
    async function getExpenses(){
        const url = "http://localhost:8080/transactionsInfo"; 
        const expenseData = await fetch(url)
        const data = await expenseData.json()
        return data 
      }
      async function getAccounts(){
        const url = "http://localhost:8080/accountInfo"; 
        const expenseData = await fetch(url)
        const data = await expenseData.json()
        return data 
      }
      useEffect(() => {
        async function fetchData() {
          const expenseData = await getExpenses(); 
          setTransactions(expenseData["transactions"]);
          const accountsData = await getAccounts();
        //   console.log(accountsData)
          setAccounts(accountsData.accounts)
          setLoading(false);
        }
        fetchData();
      }, []);
      function calculateNetWorth() {
        return accounts.reduce((total, account) => {
            // console.log(account)
            // Check if the account type is "LOAN"
            if (account.type === "LOAN") {
                // Subtract the balance for loans
                return total - account.balances.current;
            } else {
                // Add the balance for other account types
                return total + account.balances.current;
            }
        }, 0);
    }
    function calculateMonthlyExpenses() {
        return transactions.reduce((total, transaction) => {
            return total + transaction.amount
        }, 0);
    }
    
      console.log(calculateNetWorth())
      console.log(calculateMonthlyExpenses())
  return (
    <div className="Calendar">
      <header className="Calendar-header">
/*
need to display goals that already exist (defaults, and progress towards them. for example, 
next power of 10 net worth, expenses should be below avg american 
maybe can input age and calculate how much u should have saved up 
another main part is that you need to be able to show the ability to create new goals 
based off assets or expenses (grow this account to X, eliminate this account, maintain food expense below X
i dont think graph of progress makes sense since we dont have that data, so deprioritize 
every budget should be modifiable 

create functions for net worth and overall expense volume, everything else should be button
) 
)
*/
        <p>Goals</p>
        {loading ? (
        <div className="spinner-container"> {/* Use the container class here */}
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
      ) : (
        <>
<p style={{ fontSize: '3vh' }}>Savings Goals</p>

<FinancialGoalProgressBar 
                goalName="Net Worth" 
                currentAmount={calculateNetWorth()} 
                initialGoalAmount={2000} 
                exceededColor="success" // danger 
            />
            <p style={{ fontSize: '3vh' }}>Expenses Goals</p>
    <FinancialGoalProgressBar 
                    goalName="Monthly Expenses" 
                    currentAmount={calculateMonthlyExpenses()} 
                    initialGoalAmount={2000} 
                    exceededColor="danger" // danger 
    />
        </>
      )}
      </header>
    </div>
  );
}

export default Goals;
