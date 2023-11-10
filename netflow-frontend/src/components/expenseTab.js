import React from 'react';
import './expenseTab.css';

function ExpenseTab({key, expense, date, location, cost, necessity, planned}) {
    return (
        <div>
            <table>
                <tr>
                    <th>{expense}</th>
                    <th>{date}</th>
                    <th>{location}</th>
                    <th>{cost}</th>
                    <th>{necessity}</th>
                    <th>{planned}</th>
                </tr>
            </table>
        </div>
    )
}

export default ExpenseTab;
