const express = require("express");
require("./db/mongoose"); // requiring for mongodb connection
const userRouter = require("./routes/user");

const app = express();

app.use(express.json());
app.use(userRouter);

module.exports = app;
