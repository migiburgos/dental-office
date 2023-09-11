const { updateUser, findById } = require("../../models/users/users.model");

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

async function httpFetchMyUser(req, res) {
  const userId = req.context;

  const user = await findById(userId);

  return res.status(200).json({
    user: user,
    message: "Retrieved user successfully!",
  });
}

module.exports = {
  httpUpdateUser,
  httpFetchMyUser,
};
