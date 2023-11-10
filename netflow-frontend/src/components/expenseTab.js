import React from 'react';
import './expenseTab.css';

function ExpenseTab({key, expense, date, cost, necessity, planned, color}) {
    const styles = {
        backgroundColor: color,
      };

    return (
        <div>
            <table style = {styles}>
                <tr>
                    <th>{expense}</th>
                    <th>{date}</th>
                    <th>${cost}</th>
                    <th>{necessity}</th>
                    <th>{planned}</th>
                </tr>
            </table>
        </div>
    )
}

export default ExpenseTab;
