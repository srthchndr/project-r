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

  logout(userEmail) {
    //Remove access token
    let token = JSON.parse(localStorage.getItem('user')).accessToken;

    localStorage.removeItem('user');
    return axios
      .delete('/logout', {
        headers: { authorization: `Bearer ${token}` },
        body: { email: userEmail },
      })
      .then((res) => {
        console.log(res);
      });
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
        console.log(res);
        if (res.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(res.data));
        }
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
