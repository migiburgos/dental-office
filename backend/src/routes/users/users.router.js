const express = require("express");
const { httpUpdateUser } = require("./users.controller");

const usersRouter = express.Router();

usersRouter.put("/", httpUpdateUser);

module.exports = usersRouter;
