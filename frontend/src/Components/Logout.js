import React from 'react';
import AuthService from '../Service/Auth-service';
import { useHistory } from 'react-router-dom';

function Logout() {
  const history = useHistory();

  const logoutListener = (e) => {
    e.preventDefault();
    AuthService.logout();
    history.push('/login');
  };

  return (
    <div>
      <input type='button' value='Logout' onClick={logoutListener} />
    </div>
  );
}

export default Logout;
