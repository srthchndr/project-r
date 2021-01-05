import axios from 'axios';

class AuthService {
  login(email, password) {
    //Set access token
    return axios.post('/api/auth', { email, password }).then((res) => {
      console.log(res);
      if (res.data.auth_token) {
        console.log('Access Token: ' + res.data.auth_token);
      }
    });
  }

  logout() {
    //Remove access token
    console.log('Logged out');
  }

  register(email, password, firstName, lastName) {
    //Set access token
    return axios
      .post('/register', {
        email,
        password,
        firstName,
        lastName,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  }

  getCurrentUserToken() {
    //Return the access token of the user.
    console.log('current user: is me');
  }
}

export default new AuthService();
