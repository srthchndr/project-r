import './App.css';
import Login from './Components/Login';
import { Route, Switch } from 'react-router-dom';
import Register from './Components/Register';
import Profile from './Components/Profile';
import { ProtectedRoute } from './Service/ProtectedRoute';

function App() {
  // const user = localStorage.getItem('user');

  return (
    <div>
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <ProtectedRoute exact path='/' component={Profile} />
        <Route path='*' component={() => '404 Not Found'} />
      </Switch>
    </div>
  );
}

export default App;
