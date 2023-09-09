const JWT = require("jsonwebtoken");

const JWTService = {
  encrypt: ({ payload }) => {
    return JWT.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  },

  verify: ({ token }, callback) =>
    JWT.verify(
      token,
      process.env.JWT_SECRET_KEY,
      { issuer: JWTService.ISSUER, audience: JWTService.AUDIENCE },
      callback
    ),
};

module.exports = JWTService;
