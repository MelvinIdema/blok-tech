import jwt from 'jsonwebtoken';
import Auth from '../services/Auth.js';

function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  const refreshToken = req.cookies.refreshToken;

  if (token === null) return res.redirect('/login');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    if (verified) {
      req.token = verified;
      return next();
    }
  } catch (err) {
    try {
      const refreshInDb = Auth.refreshTokens.find(
        (token) => token === refreshToken
      );
      const refreshVerified =
        refreshInDb &&
        jwt.verify(refreshToken, process.env.REFRESHTOKEN_SECRET);
      const newToken = jwt.sign(
        { email: refreshVerified.email },
        process.env.TOKEN_SECRET,
        { expiresIn: 20 }
      );
      res.cookie('token', newToken, { maxAge: 900000, httpOnly: true });
      return next();
    } catch (err) {
      return res.redirect('/user/login');
    }
  }
}

export default authenticateToken;
