import React from 'react';
import './expenseTab.css';

function ExpenseTab({key, expense, date, cost, necessity, planned, color}) {
    const styles = {
        backgroundColor: color,
      };

    return (
        <div>
            <table style={{ width: '100%', textAlign: 'left' }}>
                <thead>
                    <tr>
                        <th>Expense</th>
                        <th>Date</th>
                        <th>Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        <tr>
                            <td style={{ paddingLeft: '129px' }}>{expense}</td>
                            <td style={{ paddingLeft: '129px' }}>{date}</td>
                            <td style={{ paddingLeft: '129px' }}>${cost.toFixed(2)}</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ExpenseTab;
