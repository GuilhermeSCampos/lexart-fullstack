const express = require("express");
const PhoneController = require("../controllers/PhoneController");
const PhoneMiddlewares = require("../middlewares/PhoneMiddlewares");
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const rescue = require("express-rescue");

const phoneRouter = express.Router();

// VALIDATE TOKEN INTERACT WITH PHONES

phoneRouter.use([
  AuthMiddleware.verifyTokenExists,
  AuthMiddleware.validateToken,
]);

// CREATE PHONE -- POST

phoneRouter.post("/", [
  rescue(PhoneMiddlewares.verifyProductSchema),
  rescue(PhoneController.create),
]);

// GET PHONES -- GET

phoneRouter.get("/search", rescue(PhoneController.getByQuery));

phoneRouter.get("/:id", rescue(PhoneController.getById));

phoneRouter.get("/", rescue(PhoneController.getAll));

// EDIT PHONE -- PUT

phoneRouter.put("/:id", [
  rescue(PhoneMiddlewares.verifyProductSchema),
  rescue(PhoneController.editPhone),
]);

// DELETE PHONE -- DELETE

phoneRouter.delete("/:id", rescue(PhoneController.deletePhone));

module.exports = phoneRouter;
