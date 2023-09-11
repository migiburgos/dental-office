const {
  findByUsername,
  createUser,
} = require("../../models/users/users.model");
const Encrypt = require("../../utils/encryption");
const JWTService = require("../../utils/jwt");

async function httpRegister(req, res) {
  const { name, username, password } = req.body;

  // validate
  if (!name || !username || !password) {
    return res.status(400).json({
      error: {
        message: "Missing required user property",
      },
    });
  }

  // check if user exists
  const userExists = await findByUsername(username);
  if (userExists) {
    return res.status(400).json({
      error: {
        message: "Username already exists",
      },
    });
  }

  // encrypt password
  const encyrptedPassword = await Encrypt.encryptPassword(password);

  // create user
  const user = await createUser(name, username, encyrptedPassword);

  // create access token
  const payload = { user: user._id };
  const accessToken = JWTService.encrypt({ payload });

  return res.status(201).json({
    token: accessToken,
    user: user,
    message: "User registered successfully!",
  });
}

async function httpLogin(req, res) {
  const { username, password } = req.body;

  // validate
  if (!username || !password) {
    return res.status(400).json({
      error: {
        message: "Missing required user property",
      },
    });
  }

  // check if user exists
  const user = await findByUsername(username);
  if (!user) {
    console.log("Username or password is incorrect");
    return res.status(400).json({
      error: {
        message: "Username or password is incorrect",
      },
    });
  }

  // check if passwords match
  const passwordsMatch = await Encrypt.comparePasswords(
    password,
    user.password
  );
  if (!passwordsMatch) {
    return res.status(400).json({
      error: "Username or password is incorrect",
    });
  }

  // create access token
  const payload = { user: user._id };
  const accessToken = JWTService.encrypt({ payload });

  return res.status(200).json({
    token: accessToken,
    user: user,
    message: "Login Successful!",
  });
}

module.exports = {
  httpRegister,
  httpLogin,
};
