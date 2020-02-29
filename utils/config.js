// File này chứa environment variables

// Lấy giá trị biến từ file .env
require('dotenv').config();

const { PORT } = process.env;
const { MONGODB_URI } = process.env;

module.exports = {
  MONGODB_URI,
  PORT,
};
