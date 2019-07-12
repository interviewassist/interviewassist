const path = require("path");
const express = require("express");
require("./db/mongoose"); // requiring for mongodb connection
const userRouter = require("./routes/user");
const pageRouter = require("./routes/page");
const topicRouter = require("./routes/topic");

const app = express();

// app.use(require('connect-history-api-fallback')());

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.json());

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.use(pageRouter);
app.use(userRouter);
app.use(topicRouter);

module.exports = app;
