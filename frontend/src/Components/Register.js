import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthService from '../Service/Auth-service';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const role = 'investor';
  const history = useHistory();

  const registrationRequest = async (e) => {
    e.preventDefault();
    await AuthService.register(email, password, firstName, lastName, role);
    if (AuthService.getCurrentUserToken()) {
      console.log('In redirecting block');
      history.push('/');
    } else {
      console.log('False');
    }
  };

  return (
    <div>
      <form onSubmit={registrationRequest}>
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
