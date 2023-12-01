import React, { useState, useEffect } from 'react';
import HomeButton from '../components/homeButton';
import logo from '../logo.svg';
import './Calendar.css';
import ExpensesDropdown from '../components/ExpensesDropdown';
import Spinner from 'react-bootstrap/Spinner';
import FinancialGoalProgressBar from '../components/FinancialGoalProgressBar';
import Modal from 'react-bootstrap/Modal';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
function Goals() {
    const [transactions, setTransactions] = useState([])
    const [accounts, setAccounts] = useState([])
    const [loading, setLoading] = useState(true); // Add a loading state
    const [assetGoals, setAssetGoals] = useState([]); // Initialize with empty array
    const [show, setShow] = useState(false);
    const [lineData, setLineData] = useState({});

    const [expenseGoals, setExpenseGoals] = useState([]); // Initialize with empty array
    const expensesOverTimeData = {
        "Payment": [2500, 2200, 2300, 2400, 2103],
        "Credit Card": [30, 40, 35, 28, 25],
        "Travel": [200, 150, 120, 90, 11.73],
        "Taxi": [15, 12, 10, 13, 11.73],
        "Transfer": [7000, 6800, 6900, 6950, 6845.78],
        "Debit": [6000, 5800, 5600, 5500, 5850],
        "Deposit": [1200, 1100, 1000, 900, 1000],
        "Recreation": [80, 85, 90, 75, 78.50],
        "Gyms and Fitness Centers": [100, 90, 80, 70, 78.50],
        "Airlines and Aviation Services": [0, 0, 0, 0, 0],
        "Food and Drink": [1200, 1300, 1150, 1120, 1105.73],
        "Restaurants": [1200, 1300, 1150, 1120, 1105.73],
        "Fast Food": [500, 550, 520, 510, 512],
        "Coffee Shop": [5, 6, 4.5, 4, 4.33],
        "Payroll": [-5, -6, -4, -3, -4.22],
        "Monthly Expenses": [11000, 10800, 10700, 10600, 10645.24],
        "Shops": [600, 550, 520, 510, 500],
        "Sporting Goods": [550, 600, 450, 400, 500]
    };
    const assetsOverTimeData = {
        "Net Worth": [-55000, -54000, -53000, -52800, -52681.32],
        "Plaid Checking": [100, 105, 108, 112, 110],
        "Plaid Saving": [190, 200, 205, 208, 210], 
        "Plaid CD": [280, 290, 295, 298, 300],
        "Plaid Credit Card": [400, 405, 408, 412, 410],
        "Plaid Money Market": [43000, 43100, 43150, 43180, 43200],
        "Plaid IRA": [300, 310, 315, 318, 320.76],
        "Plaid 401k": [23000, 23200, 23400, 23500, 23631.98],
        "Plaid Student Loan": [66000, 65800, 65500, 65300, 65262.00],
        "Plaid Mortgage": [56500, 56400, 56350, 56310, 56302.06]
    };
    
    
    
    const handleShow = (goalName, identifier) => {
        // Assuming you have a function to fetch or generate data for the line graph
        const dataForGraph = getGraphData(goalName, identifier);
        setLineData(dataForGraph);
        setShow(true);
    };
    const handleClose = () => setShow(false);

    const getGraphData = (goalName, identifier) => {
        console.log("huh " + goalName + " " +  identifier)
        let thisData = []
        if (identifier === "asset"){
            thisData = [... assetsOverTimeData[goalName]]
        }
        else if (identifier === "expense"){
            thisData = [...expensesOverTimeData[goalName]]
            console.log("test print")
        }
        return {
            labels: [ 'July', 'August', 'September', 'October', 'November'],
            datasets: [{
                label: goalName,
                data: thisData,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        };
    };
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
    console.log("plz")
    console.log(uniqueCategories)
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

            <div className='container1' style={{borderRadius:'15px', backgroundColor:'#d3dded', height:'80vh', width:'50vw', margin:'20px', overflowY:'auto'}}>
                <div className='1st' style={{top:'13%'}}>
<p style={{ fontSize: '3vh' }}>Savings Goals</p>
<ExpensesDropdown categories={assetNames} onSelectCategory={assetHandleSelectCategory} inputTitle="Create New Asset Goal" />
                <hr></hr>
{assetGoals.map((goal, index) => (
    <div className='expand' style={{borderRadius:'15px', backgroundColor:'#82f071'}}>
                            <FinancialGoalProgressBar
                                key={index}
                                goalName={goal.goalName}
                                currentAmount={goal.currentAmount}
                                initialGoalAmount={goal.goalAmount}
                                exceededColor={goal.exceededColor}
                                onRemove={() => handleRemoveAssetGoal(index)}
                                onDetails={() => handleShow(goal.goalName, "asset")}


                            />
    </div>
                        ))} </div><br/>
                <div className='2nd' style={{top:'55%'}}>
 <p style={{ fontSize: '3vh' , position:'relative'}}>Expenses Goals</p>
 <ExpensesDropdown categories={uniqueCategories} onSelectCategory={handleSelectCategory} inputTitle="Create New Expense Goal" />
                <hr></hr>
 {expenseGoals.map((goal, index) => (
     <div className='expand'  style={{borderRadius:'15px', backgroundColor:'#f26374'}}>
    <FinancialGoalProgressBar
        key={index}
        goalName={goal.goalName}
        currentAmount={goal.currentAmount}
        initialGoalAmount={goal.goalAmount}
        exceededColor={goal.exceededColor}
        onRemove={() => handleRemoveGoal(index)}
        onDetails={() => handleShow(goal.goalName, "expense")}

    />
     </div>
))}</div>
            </div>
                    </>
                )}
                <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>5 Month Progress</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Line data={lineData} />
                </Modal.Body>
            </Modal>

            </header>
        </div>
  );
}

export default Goals;
