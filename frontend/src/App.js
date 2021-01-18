import Login from './Components/Login';
import Logout from './Components/Logout';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './Components/Register';
import Profile from './Components/Profile';
import { ProtectedRoute } from './Service/ProtectedRoute';
import { PublicRoute } from './Service/PublicRoute';
import Sidebar from './Components/Sidebar/Sidebar'
import { useState } from 'react';


function App() {
  // const user = localStorage.getItem('user');
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(localStorage.getItem("user"));
  return (
    <>
      <Sidebar {...{isUserLoggedIn}} setIsUserLoggedIn={setIsUserLoggedIn}/>
      <div>
        <Switch>
          <PublicRoute exact path='/login' component={Login} {...{setIsUserLoggedIn}} />
          <Route exact path='/logout' component={Logout} />
          <PublicRoute exact path='/register' component={Register} />
          <ProtectedRoute exact path='/' component={Profile} />
          <Route path='*' component={() => '404 Not Found'} />
        </Switch>
      </div>
    </>
  );
}

export default App;
