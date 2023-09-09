const JWTService = require("../utils/jwt");

module.exports = async function (req, res, next) {
  const token = req.headers["auth-token"];
  if (!token) {
    return res.status(403).json({
      error: {
        message: "Authorization Failed",
      },
    });
  }

  JWTService.verify({ token }, (err, decoded) => {
    if (err) {
      console.log("***** JWT authentication error ****");
      console.log({
        name: err.name,
        message: err.message,
        expiredAt: err?.expiredAt,
      });
      console.log("***** JWT authentication error ****");

      return res.status(400).json({
        error: {
          message: "The token you are trying to use is not valid",
        },
      });
    }

    if (!decoded || !decoded.user) {
      return res.status(400).json({
        error: {
          message: "The token you are trying to use is not valid",
        },
      });
    }

    req.context = decoded.user;
    next();
  });
};
