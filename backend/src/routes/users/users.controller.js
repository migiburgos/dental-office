const {
  findByUsername,
  createUser,
} = require("../../models/users/users.model");
const Encrypt = require("../../utils/encryption");

async function httpCreateUser(req, res) {
  const { username, password } = req.body;

  // validate
  if (!username || !password) {
    return res.status(400).json({
      error: "Missing required user property",
    });
  }

  // check if user exists
  const userExists = findByUsername(username);
  if (userExists) {
    return res.status(400).json({
      error: "Username already exists",
    });
  }

  // encrypt password
  const encyrptedPassword = await Encrypt.encryptPassword(password);

  // create user
  const user = await createUser(username, encyrptedPassword);

  // create access token
  const payload = { user: user._id };
  const accessToken = JWTService.encrypt({ payload });

  return res.status(201).json({
    token: accessToken,
    user: user,
  });
}

module.exports = {
  httpCreateUser,
};
