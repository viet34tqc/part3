// File này chứa environment variables

// Lấy giá trị biến từ file .env
require('dotenv').config();

const { PORT } = process.env;
let { MONGODB_URI } = process.env;

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI;
}

module.exports = {
  MONGODB_URI,
  PORT,
};
