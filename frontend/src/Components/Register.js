import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthService from '../Service/Auth-service';

function Register() {
  const role = 'investor';
  const history = useHistory();

  const [registerFormValues, setRegisterFormValues] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [registerFormErrors, setRegisterFormErrors] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });

  const handleRegisterFormChange = e => {
    const {name, value} = e.target;
    setRegisterFormValues({
      ...registerFormValues,
      [name]: value
    })
  }

  function validateRegisterForm() {  
    let errors = {};
    if (!registerFormValues.email) {
      errors.email = 'Email is required';
      errors.hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(registerFormValues.email)) {
      errors.email = 'Email address is invalid';
      errors.hasError = true;
    }
    if (!registerFormValues.password) {
      errors.password = 'Password is required';
      errors.hasError = true;
    } else if (registerFormValues.password.length < 6) {
      errors.password = 'Password needs to be 6 characters or more';
      errors.hasError = true;
    }
  
    if (!registerFormValues.firstName.trim()) {
      errors.firstName = 'First name is required';
      errors.hasError = true;
    }

    if (!registerFormValues.lastName.trim()) {
      errors.lastName = 'Last name is required';
      errors.hasError = true;
    }
    setRegisterFormErrors(errors);
    return errors.hasError;
  }

  const handleRegisterFormSubmit = async (e) => {
    e.preventDefault();
    if(!validateRegisterForm()) {      
      await AuthService.register(registerFormValues.email, registerFormValues.password, registerFormValues.firstName, registerFormValues.lastName, role);
      if (AuthService.getCurrentUserToken()) {
        console.log('In redirecting block');
        history.push('/');
      } else {
        console.log('False');
      }
    }
  };

  return (
    <div className="registration-block">
      {registerFormErrors.hasError && <div className="reg-form-errors">        
        {registerFormErrors.email && <p>{registerFormErrors.email}</p>}
        {registerFormErrors.password && <p>{registerFormErrors.password}</p>}
        {registerFormErrors.firstName && <p>{registerFormErrors.firstName}</p>}
        {registerFormErrors.lastName && <p>{registerFormErrors.lastName}</p>}
      </div>}
      <form onSubmit={handleRegisterFormSubmit}>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="email"  placeholder="name@example.com" name="email" value={registerFormValues.email} onChange={handleRegisterFormChange}/>
          <label htmlFor="floatingInput">Email</label>
        </div>
        <div className="form-floating mb-3">
          <input type="password" className="form-control" id="password" placeholder="Password" name="password" value={registerFormValues.password} onChange={handleRegisterFormChange}/>
          <label htmlFor="floatingPassword">Password</label>
        </div>
        {/* If we need confirm password */}
        {/* <div class="form-floating mb-3">
          <input type="password" class="form-control" id="floatingPassword" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <label for="floatingPassword">Password</label>
        </div> */}
        <div className="row g-2 mb-3">
          <div className="col-md">
            <div className="form-floating">
              <input type="text" className="form-control" id="fname" placeholder="First Name" name="firstName" value={registerFormValues.firstName} onChange={handleRegisterFormChange}/>
              <label htmlFor="floatingInputGrid">First Name</label>
            </div>
          </div>
          <div className="col-md">
            <div className="form-floating">              
              <input type="text" className="form-control" id="lname" placeholder="Last Name" name="lastName" value={registerFormValues.lastName} onChange={handleRegisterFormChange}/>
                <label htmlFor="floatingInputGrid">Last Name</label>
            </div>
          </div>
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
          <button type="submit" className="btn btn-secondary btn-lg">Submit</button>
        </div>
      </form>      
      <p>Already have an account? <Link to='/login'>Login</Link></p>
    </div>
  );
}

export default Register;
