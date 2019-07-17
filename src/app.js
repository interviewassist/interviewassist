const path = require("path");
const express = require("express");

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

require("./db/mongoose"); // requiring for mongodb connection
const userRouter = require("./routes/user");
const pageRouter = require("./routes/page");
const topicRouter = require("./routes/topic");
const authRouter = require("./routes/auth");

const app = express();

const swaggerDefinition = {
  info: {
    title: "Interview Assist Swagger API",
    version: "0.0.1",
    description: "Endpoints to be utilized by Interview Assist web client"
  },
  host: "localhost:3000",
  basePath: "/",
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      scheme: "bearer",
      in: "header"
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// app.use(require("connect-history-api-fallback")());

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.json());

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.use(pageRouter);
app.use("/api", userRouter);
app.use("/api", topicRouter);
app.use("/api", authRouter);

module.exports = app;
