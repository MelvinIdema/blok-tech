import Log from '../services/Log.js';

function authenticated(req, res, next) {
  try {
    if (!req.session.email) return res.redirect('/user/login');
    next();
  } catch (err) {
    Log(err);
  }
}

export default authenticated;
