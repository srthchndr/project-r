import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthService from '../Service/Auth-service';

function Login(props) {
  const history = useHistory();
  const [loginFormValues, setLoginFormValues] = useState({
    email: '',
    password: ''
  });
  const [loginFormErrors, setLoginFormErrors] = useState({
    email: '',
    password: ''
  });

  const handleLoginFormChange = e => {
    const {name, value} = e.target;
    setLoginFormValues({
      ...loginFormValues,
      [name]: value
    })
    console.log(loginFormValues);
  }

  function validateLoginForm() {  
    let errors = {};  
    if (!loginFormValues.email.trim()) {
      errors.email = 'Please enter email';
      errors.hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(loginFormValues.email)) {
      errors.email = 'Please enter valid email';
      errors.hasError = true;
    }

    if (!loginFormValues.password.trim()) {
      errors.password = 'Please enter password';
      errors.hasError = true;
    }
    setLoginFormErrors(errors);
    return errors.hasError;
  }

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    if(!validateLoginForm()) {
      await AuthService.login(loginFormValues.email, loginFormValues.password);
      if (AuthService.getCurrentUserToken()) {
        props.setIsUserLoggedIn(true)
        history.push('/');
      }
    }
  };

  return (
    <div className="registration-block">
      {loginFormErrors.hasError && <div className="reg-form-errors">        
        {loginFormErrors.email && <p>{loginFormErrors.email}</p>}
        {loginFormErrors.password && <p>{loginFormErrors.password}</p>}
      </div>}
      <form onSubmit={handleLoginFormSubmit}>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="email"  placeholder="name@example.com" name="email" value={loginFormValues.email} onChange={handleLoginFormChange}/>
          <label htmlFor="floatingInput">Email</label>
        </div>
        <div className="form-floating mb-3">
          <input type="password" className="form-control" id="password" placeholder="Password" name="password" value={loginFormValues.password} onChange={handleLoginFormChange}/>
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
          <button type="submit" className="btn btn-secondary btn-lg">Login</button>
        </div>
      </form>
      <p>Not registered yet? <Link to='/register'>Register</Link></p>
    </div>
  );
}

export default Login;
