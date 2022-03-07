const jwt = require('jsonwebtoken');
const { refreshTokens } = require('../lib/auth.js');

module.exports.authenticateToken = function (req, res, next) {
  const token = req.cookies.token;
  const refreshToken = req.cookies.refreshToken;

  if (token === null) return res.redirect('/login');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    if (verified) return next();
  } catch (err) {
    try {
      const refreshInDb = refreshTokens.find((token) => token === refreshToken);
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
      return res.redirect('/login');
    }
  }
};
