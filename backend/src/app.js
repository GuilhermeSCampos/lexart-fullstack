require("express-async-errors");
const express = require("express");
const { phoneRouter, userRouter, authRouter } = require("./routes");
const errrorMiddleware = require("./middlewares/errorMiddleware");
require("./database");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/phones", phoneRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);

app.use(errrorMiddleware);

module.exports = app;
