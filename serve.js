const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/.env') });

const express = require('express');
const mustacheExpress = require('mustache-express');
const cookieParser = require('cookie-parser');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('./db/index.js');
const auth = require('./lib/auth.js');
const { authenticateToken } = require('./middleware/authenticateToken.js');

const app = express();

app.engine('mustache', mustacheExpress('views/partials/', '.mustache'));

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'mustache');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get('/', authenticateToken, async (req, res) => {
  const users = await db.listUsers();

  res.render('index', {
    page: 'Home',
    name: 'Melvin',
    dogs: [
      { name: 'diederik' },
      { name: 'jamie' },
      { name: 'johan' },
      { name: 'kieran' },
      { name: 'richard' },
    ],
    users: users,
    alert: {
      title: 'Under Construction',
      body: 'This site is under construction and might now work properly.',
    },
  });
});

app.get('/login', (req, res) => {
  const token = req.cookies.token;
  try {
    const verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    if (verifiedToken) res.redirect('/');
  } catch (err) {
    res.render('login', {});
  }
});

app.post('/login', async (req, res) => {
  const user = { email: req.body.email, password: req.body.password };
  const dbUser = await db.findUser(user.email);
  if (!dbUser || !bcrypt.compareSync(user.password, dbUser.password)) {
    res.render('login', {
      email: user.email,
      alert: {
        title: 'Whoops!',
        body: 'There seems to be something wrong with your account details.',
      },
    });
  } else {
    const [token, refreshToken] = auth.generateToken(user.email);
    res.cookie('token', token, { maxAge: 900000, httpOnly: true });
    res.cookie('refreshToken', refreshToken, {
      maxAge: 900000,
      httpOnly: true,
    });
    res.send({
      token,
      refreshToken,
    });
  }
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', async (req, res) => {
  const user = { email: req.body.email };
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);
  await db.addUser(user);
  res.send({
    succes: user.email,
  });
});

app.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.clearCookie('refreshToken');
  res.send({
    succes: 'Logged Out',
  });
});

app.get('/revoke', (req, res) => {
  auth.refreshTokens.length = 0;
  res.send({
    msg: 'Revoked all refresh tokens',
  });
});

app.get('/account', (req, res) => {
  res.render('account', {
    username: 'MelvinIdema',
    birthday: '',
    interests: ['hiking', 'running'],
  });
});

app.get('/password-forget', (req, res) => {
  res.send('NOT IMPLEMENTED: Password Forget');
});

app.get('/overview', (req, res) => {
  res.send('NOT IMPLEMENTED: Overview');
});

app.get('/profile/:id', (req, res) => {
  res.send(`NOT IMPLEMENTED: Profile. id: ${req.params.id}`);
});

app.get('*', (req, res) => {
  res.status(404);
  res.render('404', {
    alert: {
      title: '404 not found',
      body: 'This page has not been found. Sorry!',
    },
  });
});

app.listen(3000, () => console.log('Server started on port: 3000'));
