const path = require("path");
const express = require("express");
require("./db/mongoose"); // requiring for mongodb connection
const userRouter = require("./routes/user");
const pageRouter = require("./routes/page");

const app = express();

app.use(require('connect-history-api-fallback')());

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.use(express.json());
app.use(pageRouter);
app.use(userRouter);

module.exports = app;
