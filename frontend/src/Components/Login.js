import React, { useState } from 'react';
// import axios from 'axios';
import AuthService from '../Service/Auth-service';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const firstName = 'Ajaanu';
  const lastName = 'baahu';

  const loginRequest = (e) => {
    e.preventDefault();
    AuthService.register(email, password, firstName, lastName);
    // axios
    //   .post('/api/auth', { email, password })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    console.log('Login request sent');
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
    </div>
  );
}

export default Login;
