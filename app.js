const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./utils/config');
const middleware = require('./utils/middleware');
const notesRouter = require('./controllers/notes');

const app = express();

// Thực hiện kết nối tới MongoDB
console.log('connecting to', config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(result => {
    console.log('connected to MongoDB');
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message);
  });

// Sử dụng các middleware
app.use(cors());
app.use(express.static('build'));
app.use(bodyParser.json());
app.use(middleware.requestLogger);

// notesRouter sẽ chạy nếu như request bắt đầu bằng /api/notes/
app.use('/api/notes', notesRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
