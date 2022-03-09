import bcrypt from 'bcrypt';
import User from '../models/User.js';
import Auth from '../services/Auth.js';

async function login(req, res) {
  if (req.method === 'GET') return res.render('login');

  const user = { email: req.body.email, password: req.body.password };
  const dbUser = await User.getByEmail(user.email);

  if (!dbUser || !bcrypt.compareSync(user.password, dbUser.password)) {
    return res.render('login', {
      email: user.email,
      alert: {
        title: 'Whoops!',
        body: 'There seems to be something wrong with your account details.',
      },
    });
  }

  const [token, refreshToken] = Auth.generateToken(user.email);
  res.cookie('token', token, { maxAge: 900000, httpOnly: true });
  res.cookie('refreshToken', refreshToken, {
    maxAge: 900000,
    httpOnly: true,
  });
  return res.redirect('/');
}

async function logout(req, res) {
  res.clearCookie('token');
  res.clearCookie('refreshToken');
  res.render('login', {
    alert: {
      title: 'Logged out',
      body: 'Logged out successfully.',
    },
  });
}

async function register(req, res) {
  if (req.method === 'GET') return res.render('register');

  const user = {
    created_at: Date.now(),
    email: req.body.email,
    name: req.body.name,
  };

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);

  const result = await User.create(user);

  res.send({ 'User successfully created': result });
}

async function update(req, res) {
  res.send('NOT IMPLEMENTED: Update');
}

async function forgetPassword(req, res) {
  res.send('NOT IMPLEMENTED: forgetPassword');
}

async function show(req, res) {
  res.send('NOT IMPLEMENTED: show');
}

export default {
  login,
  logout,
  register,
  update,
  forgetPassword,
  show,
};
