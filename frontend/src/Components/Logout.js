import React from 'react';
import AuthService from '../Service/Auth-service';
import { useHistory } from 'react-router-dom';

function Logout(props) {
  const history = useHistory();

  const handleLogout = (e) => {
    e.preventDefault();
    AuthService.logout();
		props.setIsUserLoggedIn(false);
    history.push('/login');
  };

  return (
    <div>      
      <span className="navbar-top-end-link" onClick={handleLogout}>
        Logout
      </span>
    </div>
  );
}

export default Logout;
