import React, { useState, useEffect } from 'react';
import HomeButton from '../components/homeButton';
import logo from '../logo.svg';
import './Welcome.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {Chart, Title} from 'chart.js';

import {Pie} from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import Spinner from 'react-bootstrap/Spinner';

ChartJS.register(ArcElement, Tooltip, Legend);
Chart.register(Title);
// Payment, Travel , Transfer , Transfer , Recreation, Travel , Food and Drink, Food and Drink, Food and Drink, Transfer 

/*this file is actually the dashboard do not listen to class names*/
function Welcome() {
    const [responseData, setResponseData] = useState(null);
    const [liaResponseData, setLiaResponseData] = useState(null);
    const [loading, setLoading] = useState(true); // Add a loading state
    const [transactions, setTransactions] = useState([])
    const [categories, setCategories] = useState(["Payment", "Travel", "Transfer", "Recreation", "Food and Drink"])
    const [hashmap, setHashmap] = useState({"Payment": 0, "Travel": 0, "Transfer": 0, "Recreation": 0, "Food and Drink": 0})
    async function getExpenses(){
        const url = "http://localhost:8080/transactionsInfo"; 
        const expenseData = await fetch(url)
        const data = await expenseData.json()
        return data 
      }
    const [labelData, setLabelData] = useState(null);
    const [liaLabelData, setLiaLabelData] = useState(null);

    let [aTot, setATot] = useState(null);
    let [lTot, setLTot] = useState(null);


    const fetchData = async () => {
        try {
            setLoading(true);
    
            // Fetch expenses data
            const expenseData = await getExpenses();
            setTransactions(expenseData["transactions"]);
    
            // Update categories hashmap
            const updatedHashmap = { ...hashmap };
            expenseData["transactions"].forEach(transaction => {
                const category = transaction.category[0];
                if (updatedHashmap.hasOwnProperty(category)) {
                    updatedHashmap[category] += transaction.amount;
                } else {
                    updatedHashmap[category] = transaction.amount;
                }
            });
            setHashmap(updatedHashmap);
    
            const responseData = expenseData;
            let paragraphs = [];
            let liaParagraphs = [];
            let liaLabels = [];
            let labels = [];
    
            let localATot = 0;
            let localLTot = 0;
    
            if (responseData) {
                try {
                    responseData.accounts.forEach(account => {
                        if (account.type == "LOAN") {
                            liaParagraphs.push(account.balances.current);
                            liaLabels.push(account.name);
                            localLTot += account.balances.current;
                        } else {
                            paragraphs.push(account.balances.current);
                            labels.push(account.name);
                            localATot += account.balances.current;
                        }
                    });
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            }
            setATot(localATot);
            setLTot(localLTot);
            setResponseData(paragraphs);
            setLabelData(labels);
            setLiaResponseData(liaParagraphs);
            setLiaLabelData(liaLabels);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array ensures this runs once after the component mounts

    console.log(categories)
    console.log(Object.values(hashmap))
    const expensesData = {

        labels:categories,
        datasets:[
            {
                data: Object.values(hashmap),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: .5,
            }
            ]
    }


     const data = {

        labels:labelData,
        datasets:[
            {
                data: responseData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: .5,
            }
            ]
    }
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'right',
            },
            title: {
                display: true,
                text: 'Assets'
            }
        }
    }
    const options3 = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'right',
            },
            title: {
                display: true,
                text: 'Expenses'
            }
        }
    }
    const options2 = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'right',
            },
            title: {
                display: true,
                text: 'Liabilities'
            }
        }
    }
    const liaData = {
        labels:liaLabelData,
        datasets:[
            {
                data: liaResponseData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: .5,
            }
        ]
    }

    useEffect(() => {
        let isMounted = true;

        if (isMounted) {
            fetchData();
        }

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="Welcome">
            <header className="Welcome-header">
                <p>Dashboard</p>
            </header>
            {loading ? (
                <div className="spinner-container">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <div className='Charts-right'>
                    <Doughnut data={data} options={options}/>
                    <div className='Mid-text'>
                        <p3 style={{color: 'green'}}>Assets: ${aTot}</p3>
                        <p3 style={{color: '#F41212'}}>Liabilities: ${lTot}</p3>
                        <p3>Net Worth: ${aTot - lTot}</p3>
                    </div>
                    <Doughnut data={liaData} options={options2}/>
                    <Doughnut data={expensesData} options={options3}/>

                </div>
            )}
        </div>
    );
}

export default Welcome;
