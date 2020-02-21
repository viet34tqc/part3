// Require file .env để lấy thông số
require("dotenv").config();

// Require mongoose.
const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

// Connect database.
mongoose
  .connect(url, { useNewUrlParser: true })
  .then(result => {
    console.log("connected to MongoDB");
  })
  .catch(error => {
    console.log("error connecting MongoDB: ", error.message);
  });

// tạo schema.
const phonebookSchema = new mongoose.Schema({
  name: String,
  phone: String
});

// Modify return object delete field _id and field __v
phonebookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

// tạo model và export model
const Phonebook = mongoose.model("Phonebook", phonebookSchema);
module.exports = Phonebook;
