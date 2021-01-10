import React, { useState } from 'react';
import AuthService from '../Service/Auth-service';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const role = 'investor';

  const loginRequest = (e) => {
    e.preventDefault();
    const a = AuthService.register(email, password, firstName, lastName, role);
    console.log(a);
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
        <input
          type='text'
          name='firstName'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type='text'
          name='lastName'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <input type='submit' />
      </form>
    </div>
  );
}

export default Register;
