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

    const handleResponse = (response) => {
        console.log("Response received:", response);
        setResponseData(response);
        // You can perform additional actions with the response here

    };

    const parseAndDisplayData = () => {
        if (responseData) {
            try {
                // Assuming the data is in JSON format
                const parsedData = JSON.parse(responseData);



                // Display parsed data
                setResponseData(parsedData);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        }
    };
    const fetchData = () => {
        var url = "http://localhost:8080/accountInfo";
        httpGetAsync(url, handleResponse);
    };
  return (

    <div className="Welcome">
      <header className="Welcome-header">
          <p>Dashboard</p>
          <button onClick={() => {fetchData(); parseAndDisplayData();}}>Get Data</button>
          <div>
              <p>Data from the URL:</p>
              <pre>{responseData}</pre>
          </div>
      </header>
    </div>
  );
}

export default Welcome;
