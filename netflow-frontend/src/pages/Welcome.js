import React, {useState} from 'react';
import HomeButton from '../components/homeButton';
import logo from '../logo.svg';
import './Welcome.css';
/*this file is actually the dashboard do not listen to class names*/
function Welcome() {
    const [responseData, setResponseData] = useState(null);

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
        if (responseData) {
            try {
                // Assuming the data is in JSON format
                const parsedData = JSON.parse(responseData);
                parsedData.accounts.forEach(account => {
                    paragraphs.push(
                        <p3 key={account.accountId}>
                            Account Name: {account.name + "\t\t"}
                            Current Balance: {account.balances.current}<br />
                        </p3>
                    );
                });
                // Display parsed data
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        }
        setResponseData(paragraphs);
        // You can perform additional actions with the response here

    };

    const fetchData = () => {
        var url = "http://localhost:8080/accountInfo";
        httpGetAsync(url, handleResponse);
    };
  return (

    <div className="Welcome">
      <header className="Welcome-header">
          <p>Dashboard</p>
          <button onClick={fetchData}>Get Data</button>
          <div>
              <pre>{responseData}</pre>
          </div>
      </header>
    </div>
  );
}

export default Welcome;
