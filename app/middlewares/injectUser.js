import User from '../models/User.js';
import Log from '../services/Log.js';

async function injectUser(req, res, next) {
  try {
    if (req.session.email) {
      const user = await User.getByEmail(req.session.email);
      res.locals.isLoggedIn = true;
      res.locals.user = {
        password: '',
        ...user,
      };
    }
    next();
  } catch (err) {
    Log(err);
  }
}

export default injectUser;
