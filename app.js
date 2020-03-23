const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./utils/logger');

const config = require('./utils/config');
const middleware = require('./utils/middleware');
const notesRouter = require('./controllers/notes');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

// Express app
const app = express();

// Thực hiện kết nối tới MongoDB
logger.info('connecting to', config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(result => {
    logger.info('connected to MongoDB');
  })
  .catch(error => {
    logger.error('error connecting to MongoDB:', error.message);
  });

// Sử dụng các middleware
app.use(cors());
// Express server static files trong thư muc build
// localhost:3001/logo192.png
app.use(express.static('build'));
app.use(bodyParser.json());
app.use(middleware.requestLogger);

// notesRouter sẽ chạy nếu như request bắt đầu bằng /api/notes/
app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
