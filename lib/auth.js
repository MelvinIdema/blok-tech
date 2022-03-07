const jwt = require('jsonwebtoken');

const refreshTokens = [];

module.exports.generateToken = function (email) {
  const refreshToken = jwt.sign({ email }, process.env.REFRESHTOKEN_SECRET, {
    expiresIn: '5y',
  });
  refreshTokens.push(refreshToken);
  return [
    jwt.sign({ email }, process.env.TOKEN_SECRET, { expiresIn: '15m' }),
    refreshToken,
  ];
};

module.exports.refreshTokens = refreshTokens;
