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
    const [assetGoals, setAssetGoals] = useState([]); // Initialize with empty array

    const [expenseGoals, setExpenseGoals] = useState([]); // Initialize with empty array
    const handleSelectCategory = (selectedCategory) => {
        console.log(selectedCategory);
        let selectedCategoryExpenseTotal = 0;
    
        transactions.forEach(transaction => {
            // Check if the transaction's categories include the selected category
            if (transaction.category.includes(selectedCategory)) {
                selectedCategoryExpenseTotal += transaction.amount;
            }
        });
        let newExpenseGoals = [
            ...expenseGoals,
            {
                goalName: selectedCategory,
                currentAmount: selectedCategoryExpenseTotal,
                goalAmount: 300,
                exceededColor: "danger"
            }
        ];
    
        setExpenseGoals(newExpenseGoals);
    
    };
    const assetHandleSelectCategory = (selectedCategory) => {
        console.log("huh")
        console.log(accounts);
        let color = "success"
        let selectedCategoryAssetTotal = 0;
    
        accounts.forEach(account => {
            // Check if the transaction's categories include the selected category
            if (account.name === selectedCategory) {
                selectedCategoryAssetTotal += account.balances.current;
                if (account.type === "LOAN"){
                    color = "danger"
                }
            }
        });
        let newAssetGoals = [
            ...assetGoals,
            {
                goalName: selectedCategory,
                currentAmount: selectedCategoryAssetTotal,
                goalAmount: 300,
                exceededColor: color
            }
        ];
    
        setAssetGoals(newAssetGoals);
    
    };
    const handleRemoveGoal = (index) => {
        setExpenseGoals(currentGoals => currentGoals.filter((_, idx) => idx !== index));
    };
    const handleRemoveAssetGoal = (index) => {
        setAssetGoals(currentGoals => currentGoals.filter((_, idx) => idx !== index));
    };
    console.log("test")
    console.log(accounts[0])
    const assetNames = accounts.map(account => account["name"])
    console.log(assetNames)
    const categories = transactions.map(transaction => transaction["category"]);
    const flattenedCategories = categories.flatMap(category => category);
    // Remove duplicates from categories
    const uniqueCategories = Array.from(new Set(flattenedCategories));
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
          useEffect(() => {
        if (transactions.length > 0) { // Check if transactions are loaded
            setExpenseGoals([
                {
                    goalName: "Monthly Expenses",
                    currentAmount: calculateMonthlyExpenses(),
                    goalAmount: 2000,
                    exceededColor: "danger"
                }
                // ... you can add more goals here if needed ...
            ]);
        }
        if (accounts.length > 0) { // Check if transactions are loaded
            setAssetGoals([
                {
                    goalName: "Net Worth",
                    currentAmount: calculateNetWorth(),
                    goalAmount: 10000,
                    exceededColor: "success"
                }
                // ... you can add more goals here if needed ...
            ]);
        }

    }, [transactions, accounts]); // Dependency on transactions
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
        <p style={{color:'white'}}>Goals</p>
        {loading ? (
        <div className="spinner-container"> {/* Use the container class here */}
        <Spinner animation="border" role="status" style={{backgroundColor:'white'}}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
      ) : (
        <>
<p style={{ fontSize: '3vh' }}>Savings Goals</p>
<ExpensesDropdown categories={assetNames} onSelectCategory={assetHandleSelectCategory} inputTitle="Create New Asset Goal" />

{assetGoals.map((goal, index) => (
                            <FinancialGoalProgressBar
                                key={index}
                                goalName={goal.goalName}
                                currentAmount={goal.currentAmount}
                                initialGoalAmount={goal.goalAmount}
                                exceededColor={goal.exceededColor}
                                onRemove={() => handleRemoveAssetGoal(index)}

                            />
                        ))}
 <p style={{ fontSize: '3vh' }}>Expenses Goals</p>
 <ExpensesDropdown categories={uniqueCategories} onSelectCategory={handleSelectCategory} inputTitle="Create New Expense Goal" />

 {expenseGoals.map((goal, index) => (
    <FinancialGoalProgressBar
        key={index}
        goalName={goal.goalName}
        currentAmount={goal.currentAmount}
        initialGoalAmount={goal.goalAmount}
        exceededColor={goal.exceededColor}
        onRemove={() => handleRemoveGoal(index)}
    />
))}
                    </>
                )}
            </header>
        </div>
  );
}

export default Goals;
