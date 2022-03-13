import Log from '../services/Log.js';

async function injectUser(req, res, next) {
  try {
    if (req.session.user) {
      res.locals.isLoggedIn = true;
      res.locals.user = {
        ...req.session.user,
      };
    }
    next();
  } catch (err) {
    Log(err);
  }
}

export default injectUser;
