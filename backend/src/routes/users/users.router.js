const express = require("express");
const { httpUpdateUser, httpFetchMyUser } = require("./users.controller");

const usersRouter = express.Router();

usersRouter.put("/", httpUpdateUser);
usersRouter.get("/", httpFetchMyUser);

module.exports = usersRouter;
