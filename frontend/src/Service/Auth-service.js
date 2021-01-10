import axios from 'axios';
// import { Redirect } from 'react-router-dom';
// import Register from '../Components/Register';

class AuthService {
  login(email, password) {
    //Set access token
    return axios
      .post('/api/auth', { email, password })
      .then((res) => {
        console.log(res);
        if (res.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  logout() {
    //Remove access token
    localStorage.removeItem('user');
  }

  register(email, password, firstName, lastName, role) {
    //Set access token
    return axios
      .post('/register', {
        email,
        password,
        firstName,
        lastName,
        role,
      })
      .then((res) => {
        // res.status === 200 ? <Redirect to='/' /> : <Register />;
        console.log(res.status);
        console.log(res.data.accessToken);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getCurrentUserToken() {
    //Return the access token of the user.
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();
