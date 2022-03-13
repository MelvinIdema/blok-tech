import bcrypt from 'bcrypt';
import User from '../models/User.js';
import Log from '../services/Log.js';

async function login(req, res) {
  if (req.method === 'GET')
    return res.render('login', {
      alert: {
        title: 'Demo account',
        body: "You can try the application with 'demo@demo.nl' and password 'demo' or try to register your own account of course!",
      },
    });

  const user = { email: req.body.email, password: req.body.password };
  const dbUser = await User.getByEmail(user.email);

  if (dbUser && bcrypt.compareSync(user.password, dbUser.password)) {
    req.session.user = {
      name: dbUser.name,
      email: dbUser.email,
      avatar: dbUser.avatar,
    };
    return res.redirect('/');
  }

  return res.render('login', {
    email: user.email,
    alert: {
      title: 'Whoops!',
      body: 'There seems to be something wrong with your account details.',
    },
  });
}

async function logout(req, res) {
  req.session.destroy();
  res.locals.isLoggedIn = false;
  res.render('login', {
    alert: {
      title: 'Logged out',
      body: 'Logged out successfully.',
    },
  });
}

async function register(req, res) {
  if (req.method === 'GET') return res.render('register');

  const user = User.assign({
    created_at: Date.now(),
    email: req.body.email,
    name: req.body.name,
    avatar: req.files[0] ? req.files[0].location : 'jan-paparazzi-hyves.jpeg',
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);

  await User.create(user);

  req.session.user = {
    name: user.name,
    email: user.email,
    avatar: user.avatar,
  };
  res.redirect('/');
}

async function update(req, res) {
  if (req.method === 'GET') return res.render('settings');
  try {
    const user = await User.getByEmail(req.session.user.email);
    await User.update(req.session.user.email, {
      name: req.body.name,
      avatar: req.files[0] ? req.files[0].location : user.avatar,
    });
    req.session.user.name = req.body.name;
    req.session.user.avatar = req.files[0]
      ? req.files[0].location
      : user.avatar;
    res.redirect('/user/settings');
  } catch (err) {
    Log(err);
  }
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
