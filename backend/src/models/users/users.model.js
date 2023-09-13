const ObjectId = require("mongoose").Types.ObjectId;
const Users = require("./users.mongo");

async function findById(userId) {
  const user = await Users.findById(userId);

  if (user) {
    return user;
  }

  return null;
}

async function findByIdNoPassword(userId) {
  const user = await Users.findById(userId, "-password");

  if (user) {
    return user;
  }

  return null;
}

async function findByUsername(username) {
  const user = await Users.findOne({
    username: username.toLowerCase(),
  });

  if (user) {
    return user;
  }

  return null;
}

async function createUser(name, username, password) {
  const user = await Users.create({
    name: name,
    username: username.toLowerCase(),
    password: password,
  });

  return user;
}

async function updateUser(userId, newData) {
  const user = await Users.findOneAndUpdate(
    {
      _id: new ObjectId(userId),
    },
    newData,
    { new: true, fields: { name: 1, username: 1 } }
  );

  return user;
}

async function deleteGeneratedUser() {
  const user = await Users.deleteOne({ username: "aliya" });

  return user;
}

module.exports = {
  findByUsername,
  createUser,
  findById,
  updateUser,
  deleteGeneratedUser,
  findByIdNoPassword,
};
