const db = require('./db/index.js');
const path = require('path');
const bcrypt = require('bcrypt');
const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();

app.engine('mustache', mustacheExpress('views/partials/', '.mustache'));

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'mustache');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
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
  res.render('login', {});
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', async (req, res) => {
  console.log(req.body);
  const user = { email: req.body.email };
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);
  await db.addUser(user);
  res.send({
    succes: user.email,
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
