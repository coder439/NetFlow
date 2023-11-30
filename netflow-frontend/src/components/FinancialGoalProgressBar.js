import React, { useState } from 'react';
import { ProgressBar } from 'react-bootstrap';

const FinancialGoalProgressBar = ({ goalName, currentAmount, initialGoalAmount,exceededColor }) => {
    // State for editable goal amount
    const [goalAmount, setGoalAmount] = useState(initialGoalAmount);

    const progress = Math.min((currentAmount / goalAmount) * 100, 100);
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
            </div>
        </div>
    );
};

export default FinancialGoalProgressBar;
