const config = require("./utils/config");
const middleware = require("./utils/middleware");
const personRouter = require("./controllers/person");

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Connect database.
mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(result => {
    console.log("connected to MongoDB");
  })
  .catch(error => {
    console.log("error connecting MongoDB: ", error.message);
  });

app.use(express.static("build"));
app.use(bodyParser.json());
app.use(cors());

morgan.token("body", function(req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.use(middleware.requestLogger);
app.use("/api/persons", personRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
