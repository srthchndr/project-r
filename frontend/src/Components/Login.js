import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../Service/Auth-service';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginRequest = (e) => {
    e.preventDefault();
    const a = AuthService.login(email, password);
  };

  return (
    <div>
      <form onSubmit={loginRequest}>
        <input
          type='text'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type='submit' />
      </form>
      <Link to='/register'>Register</Link>
    </div>
  );
}

export default Login;
