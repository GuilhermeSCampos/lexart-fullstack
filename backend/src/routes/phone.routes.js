const express = require("express");
const PhoneController = require("../controllers/PhoneController");
const PhoneMiddlewares = require("../middlewares/PhoneMiddlewares");
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const rescue = require("express-rescue");

const phoneRouter = express.Router();

phoneRouter.use([
  AuthMiddleware.verifyTokenExists,
  AuthMiddleware.validateToken,
]);

phoneRouter.post("/", [
  rescue(PhoneMiddlewares.verifyProductSchema),
  rescue(PhoneController.create),
]);

phoneRouter.get("/", rescue(PhoneController.getAll));

phoneRouter.put("/:id", [rescue(PhoneController.editPhone)]);

phoneRouter.delete("/:id", rescue(PhoneController.deletePhone));

module.exports = phoneRouter;
