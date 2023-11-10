import React from 'react';
import { useNavigate} from 'react-router-dom';


function HomeButton() {
    const navigate = useNavigate();

    return (
      <button onClick={() => navigate('')}>NetFlow</button>
  );
}

export default HomeButton;
