import React, { useState } from 'react';
import { ProgressBar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const FinancialGoalProgressBar = ({ key, goalName, currentAmount, initialGoalAmount,exceededColor, onRemove, onDetails }) => {
    // State for editable goal amount
    const [goalAmount, setGoalAmount] = useState(initialGoalAmount);

    let progress = Math.min((currentAmount / goalAmount) * 100, 100);
    if (currentAmount < 0 || goalAmount == 0){
        progress = 0
    } 
    const progressBarColor = currentAmount > goalAmount ? exceededColor : 'primary';

    const handleGoalAmountChange = (event) => {
        setGoalAmount(Number(event.target.value));
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h3>{goalName}</h3>
            <div style={{ width: '50%', margin: 'auto' }}>
                <ProgressBar now={progress}  variant={progressBarColor} />
            </div>
            <div>
                Current Amount: ${currentAmount.toFixed(2)} / 
                Goal Amount: $
                <input 
                    type="number" 
                    value={goalAmount} 
                    onChange={handleGoalAmountChange}
                    min="0"
                />
                <button onClick={() => onRemove(key)}>X</button>
                <Button variant="primary" onClick={() => onDetails(goalName)}>Details</Button>

            </div>
        </div>
    );
};

export default FinancialGoalProgressBar;
