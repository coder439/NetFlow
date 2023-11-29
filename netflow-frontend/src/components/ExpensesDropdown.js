import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function ExpensesDropdown({ categories, onSelectCategory }) {
  return (
    <DropdownButton id="dropdown-basic-button" title="Expense Category">
      {categories.map((category, index) => (
        <Dropdown.Item key={index} onClick={() => onSelectCategory(category)}>
          {category}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
}

export default ExpensesDropdown;
