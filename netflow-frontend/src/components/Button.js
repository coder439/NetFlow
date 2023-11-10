import React from 'react';

function MyButton(props) {
    const { text, onClick } = props;
    const myStyle = {
        color: 'blue'
    }
    return (
        <button className='button' onClick={onClick}>{text}</button>
    );
}

export default MyButton;