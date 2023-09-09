const express = require("express");
const { httpRegister, httpLogin } = require("./auth.controller");

const authRouter = express.Router();

authRouter.post("/register", httpRegister);
authRouter.post("/login", httpLogin);

module.exports = authRouter;
