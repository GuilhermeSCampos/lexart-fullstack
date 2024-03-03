const express = require("express");

const AuthController = require("../controllers/AuthController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const UserMiddleware = require("../middlewares/UserMiddleware");

const rescue = require("express-rescue");

const authRouter = express.Router();

authRouter.post("/login", [
  rescue(UserMiddleware.verifyUserSchema),
  rescue(AuthController.login),
]);

authRouter.post("/validate", [
  rescue(AuthMiddleware.verifyTokenExists),
  rescue(AuthController.validateToken),
]);

module.exports = authRouter;
