import React, { useState, useEffect } from 'react';
import HomeButton from '../components/homeButton';
import logo from '../logo.svg';
import './Welcome.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {Chart, Title} from 'chart.js';

import {Pie} from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);
Chart.register(Title);


/*this file is actually the dashboard do not listen to class names*/
function Welcome() {
    const [responseData, setResponseData] = useState(null);
    const [liaResponseData, setLiaResponseData] = useState(null);

    const [labelData, setLabelData] = useState(null);
    const [liaLabelData, setLiaLabelData] = useState(null);

    let [aTot, setATot] = useState(null);
    let [lTot, setLTot] = useState(null);

    const httpGetAsync = (theUrl, callback) => {
        console.log("Making HTTP request to:", theUrl);
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                callback(xmlHttp.responseText);
            }
        };
        xmlHttp.open("GET", theUrl, true);
        xmlHttp.send(null);
    };

    const handleResponse = (responseData) => {
        console.log("Response received:", responseData);
        let paragraphs = [];
        let liaParagraphs = [];
        let liaLabels = [];
        let labels = [];
        if (responseData) {
            try {
                // Assuming the data is in JSON format
                const parsedData = JSON.parse(responseData);
                parsedData.accounts.forEach(account => {
                    if (account.type == "LOAN")
                    {
                        liaParagraphs.push(
                            account.balances.current
                        );
                        liaLabels.push(
                            account.name
                        )
                        lTot = lTot + account.balances.current;
                    }
                    else
                    {
                        paragraphs.push(
                            account.balances.current
                        );
                        labels.push(
                            account.name
                        )
                        aTot = aTot + account.balances.current;
                    }

                });
                /*TODO FORM THE TRANSACTIONS INTO GROUPS AND PIE CHART IT!!!*/
                parsedData.transactions.forEach(account => {
                    if (account.type == "LOAN")
                    {
                        liaParagraphs.push(
                            account.balances.current
                        );
                        liaLabels.push(
                            account.name
                        )
                    }
                    else
                    {
                        paragraphs.push(
                            account.balances.current
                        );
                        labels.push(
                            account.name
                        )
                    }

                });
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        }
        setATot(aTot);
        setLTot(lTot);
        setResponseData(paragraphs);
        setLabelData(labels);
        setLiaResponseData(liaParagraphs);
        setLiaLabelData(liaLabels);
        // You can perform additional actions with the response here

    };
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
    const fetchData = () => {
        var url = "http://localhost:8080/transactionsInfo";
        httpGetAsync(url, handleResponse);
    };

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
          <div className='Charts-right'>
              <Doughnut data={data} options={options}/>
              <div className='Mid-text'>
                  <p3 style={{color:'green'}}>Assets:$
                      {aTot}
                  </p3>
                  <p3 style={{color:'#F41212'}}>Liabilities:$
                       {lTot}
                  </p3>
                  <p3>NetWorth:${aTot - lTot}
                  </p3>
              </div>
              <Doughnut data={liaData} options={options2}/>
          </div>



    </div>
  );
}

export default Welcome;
