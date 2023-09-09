const Users = require("./users.mongo");

async function findByUsername(username) {
  const user = await Users.findOne({
    username: username.toLowerCase(),
  });

  if (user) {
    return user;
  }

  return null;
}

async function createUser(username, password) {
  const user = await Users.create({
    username: username.toLowerCase(),
    password: password,
  });

  return user;
}

module.exports = {
  findByUsername,
  createUser,
};