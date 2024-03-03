const express = require("express");

const UserController = require("../controllers/UserController");
const UserMiddleware = require("../middlewares/UserMiddleware");
const rescue = require("express-rescue");

const userRouter = express.Router();

userRouter.post("/register", [
  rescue(UserMiddleware.verifyUserSchema),
  rescue(UserController.register),
]);

module.exports = userRouter;
