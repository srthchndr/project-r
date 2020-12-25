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
    secret: 'todo-app-super-shared-secret',
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
    let decodedToken = jwt_decode(token);
    let d1 = new Date();
    let d2 = new Date(decodedToken.exp * 1000);
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

app.post('/api/auth', function (req, res) {
  console.log(req.body);

  const body = req.body;

  //check username and password in db and send token if valid user record is found
  if (body.password != 'password') return res.sendStatus(401);

  let token = jwt.sign(
    { userID: 2, role: 'admin' },
    'todo-app-super-shared-secret',
    { expiresIn: '75000' }
  );
  res.send({ auth_token: token, refresh_token: 'RefreshToken' });
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
      // bcrypt.hash(req.body.password, 7).then(function(result) {
      //     console.log(result); //
      //     req.body.password = result;
      // })
      const regUser = new User(req.body);
      regUser.save((err, output) => {
        if (err) return console.error('ERROR: ' + err);
        console.log('Saved the user into DB');
        console.log(output);
      });
      res.send('Received response and is successful');
    }
  } catch (err) {
    console.error('ERROR: ' + err);
  }
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
