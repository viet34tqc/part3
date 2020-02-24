// Lấy giá trị biến từ file .env
require("dotenv").config();

const mongoose = require("mongoose");

// Thêm dòng này để fix lỗi
// DeprecationWarning: collection.findAndModify is deprecated...
mongoose.set("useFindAndModify", false);

const url = process.env.MONGODB_URI;

mongoose
  .connect(url, { useNewUrlParser: true })
  .then(result => {
    console.log("connected to MongoDB");
  })
  .catch(error => {
    console.log("error connecting to MongoDB:", error.message);
  });

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: 5,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  important: Boolean
});

// Xóa field _id và __v( version ) của mongo và thêm trường id dạng string vào object
noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model("Note", noteSchema);
