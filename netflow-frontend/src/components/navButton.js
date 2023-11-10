import React from 'react';
import { useNavigate} from 'react-router-dom';


function NavButton() {
    const navigate = useNavigate();

    return (
      <button onClick={() => navigate({path})}>{name}</button>
  );
}

export default HomeButton;
