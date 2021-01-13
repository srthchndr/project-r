require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const cors = require('cors');
const jwt_decode = require('jwt-decode');
const bcrypt = require('bcrypt');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(
  expressJwt({
    secret: process.env.ACCESS_TOKEN_SECRET,
    algorithms: ['HS256'],
    requestProperty: 'auth',
  }).unless({ path: ['/api/auth', '/register'] })
);

var checkRefreshNeeded = function (req, res, next) {
  if (
    req.path == '/api/auth' ||
    req.path == '/refresh' ||
    req.path == '/register'
  ) {
    return next();
  }
  console.log('Check Refresh');
  console.log(req.auth);
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    let token = req.headers.authorization.split(' ')[1];
    let user = jwt_decode(token);
    let d1 = new Date();
    let d2 = new Date(user.exp * 1000);
    let timeRemaining = (d2 - d1) / 1000;
    console.log(timeRemaining);
    if (timeRemaining < 60) {
      res.sendStatus(401);
    } else {
      next();
    }
  } else {
    next();
  }
};

app.use(checkRefreshNeeded);

//Initializing mongoose
let mongoose = require('mongoose');
const User = require('./Model/user');
const { response } = require('express');

mongoose.connect(process.env.DB_CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to DB');
});

// app.post('/api/auth', function (req, res) {
//   console.log(req.body);

//   const body = req.body;

//   //check username and password in db and send token if valid user record is found
//   if (body.password != 'password') return res.sendStatus(401);

//   let token = jwt.sign(
//     { userID: 2, role: 'admin' },
//     'todo-app-super-shared-secret',
//     { expiresIn: '75000' }
//   );
//   res.send({ auth_token: token, refresh_token: 'RefreshToken' });
// });
app.post('/api/auth', async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findOne({ email: req.body.email });
    tokenUser = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    if (user) {
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        const accessToken = generateAccessToken(tokenUser);
        const refreshToken = jwt.sign(
          tokenUser,
          process.env.REFRESH_TOKEN_SECRET
        );

        const updateRes = await User.findOneAndUpdate(
          { email: user.email },
          { refreshToken: refreshToken }
        );
        await updateRes.save();

        res.json({ accessToken: accessToken, refreshToken: refreshToken });
      } else {
        console.log('Passwords does not match');
        res.sendStatus(401);
      }
    } else {
      console.log('User not found');
      res.sendStatus(403);
    }
  } catch (err) {
    console.log('Error: ' + err);
    res.sendStatus(500);
  }
});

app.post('/refresh', function (req, res) {
  console.log(req.body);

  const refreshToken = req.body.refreshToken;

  if (refreshToken == null) return res.sendStatus(401);
  const fetchRefreshToken = User.findOne(
    { refreshToken: refreshToken },
    (err, user) => {
      if (err) return res.sendStatus(403);

      if (user.refreshToken != refreshToken) return res.sendStatus(403);

      jwt.verify(
        refreshToken,
        process.env.REFREST_TOKEN_SECRET,
        (err, user) => {
          if (err) return res.sendStatus(403);
          const renewedAccessToken = generateAccessToken({
            email: user.email,
            role: user.role,
          });
          res.json({ access_token: renewedAccessToken });
        }
      );
    }
  );
});

app.post('/register', async (req, res) => {
  console.log('Registering User: ' + req.body.firstName);
  try {
    const user = await User.findOne({ email: req.body.email });
    // console.log(user.email);
    if (user) {
      res.send('Email already exists, please use new email');
    } else {
      req.body.password = await bcrypt.hash(req.body.password, 7);
      bcrypt.hash(req.body.password, 7).then(function (result) {
        console.log(result); //
        req.body.password = result;
      });
      let userObj = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      };
      const refreshToken = jwt.sign(userObj, process.env.REFRESH_TOKEN_SECRET);
      const accessToken = generateAccessToken(userObj);
      const regUser = new User(req.body);
      regUser.refreshToken = refreshToken;
      regUser.save((err, output) => {
        if (err) return console.error('ERROR: ' + err);
        console.log('Saved the user into DB');
        console.log(output);
      });
      res.json({ accessToken: accessToken, refreshToken: refreshToken });
    }
  } catch (err) {
    console.error('ERROR: ' + err);
  }
});

app.delete('/logout', (req, res) => {
  console.log(req.auth);
  User.findOne({ email: req.auth.email }, (err, doc) => {
    if (err) return res.sendStatus(403);
    doc.refreshToken = undefined;
    doc.save();
    return res.send('Successfully logged out. Thank you!');
  });
});

app.get('/testdata', (req, res, next) => {
  console.log('get /testdata');
  console.log(req.auth.userID);
  res.send({ 1: 'testing', 2: 'tester' });
});

process.env.PORT = process.env.PORT;
const server = app.listen(process.env.PORT, function () {
  let port = server.address().port;
  // Starting the Server at the port 3000
  console.log(`Started on PORT ${port}`);
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '75000',
  });
}
