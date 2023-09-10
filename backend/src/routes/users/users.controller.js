const { updateUser } = require("../../models/users/users.model");

async function httpUpdateUser(req, res) {
  const userId = req.context;
  const { name } = req.body;

  // validate
  if (!name) {
    return res.status(400).json({
      error: {
        message: "Missing required user property",
      },
    });
  }

  const user = await updateUser(userId, { name });

  return res.status(200).json({
    user: user,
    message: "User updated successfully!",
  });
}

module.exports = {
  httpUpdateUser,
};
