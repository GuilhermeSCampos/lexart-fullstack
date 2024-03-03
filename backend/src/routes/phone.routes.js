const express = require("express");
const PhoneController = require("../controllers/PhoneController");
const PhoneMiddlewares = require("../middlewares/PhoneMiddlewares");
const rescue = require("express-rescue");

const phoneRouter = express.Router();

phoneRouter.post("/", [
  rescue(PhoneMiddlewares.verifyProductSchema),
  rescue(PhoneController.create),
]);

phoneRouter.get("/", PhoneController.getAll);

phoneRouter.put("/", [PhoneController.editPhone]);

phoneRouter.delete("/:id", PhoneController.deletePhone);

module.exports = phoneRouter;
