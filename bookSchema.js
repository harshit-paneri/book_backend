const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  publisher: String,
  genre: String,
  publish_year: Number,
  price: String,
  image_url: String,
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
