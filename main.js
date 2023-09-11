const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Book = require("./bookSchema");

// Datat Set
const books = [
    {
        id: 1,
        title: "Rich Dad Poor Dad",
        author: "Robert T. Kiyosaki",
        publisher: "Warner Books Ed",
        genre: "Personal Finance",
        publish_year: 1997,
        price: "19.99 USD",
        image_url: "http://example.com/rich_dad_poor_dad.jpg"


    },
    {
        id: 2,
        title: "To kill a mocking bird",
        author: "Harpee lee",
        publisher: "J.B.",
        genre: "fiction",
        publish_year: 1960,
        price: "14.99 USD",
        image_url: "http://example.com/to_kill_a_mockingbird.jpg"

    },
    {
        id: 3,
        title: "1984",
        author: "George oswall",
        publisher: "S & W",
        genre: "horror",
        publish_year: 1949,
        price: "16.99 USD",
        image_url: "http://example.com/1984.jpg"

    },
]


// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>");
});

// Get all books
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Get a book by id
app.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).send("Book not found");
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Get book by title
app.get("/books/byTitle/:title", async (req, res) => {
  try {
    const book = await Book.findOne({ title: req.params.title });
    if (book) {
      res.json(book);
    } else {
      res.status(404).send("Book not found");
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Create a new book
app.post("/books", async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).send("Book created");
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Delete a book by id
app.delete("/books/:id", async (req, res) => {
  try {
    await Book.findByIdAndRemove(req.params.id);
    res.send("Deleted");
  } catch (error) {
    res.status(404).send("Book not found");
  }
});

// Update book details by id
app.patch("/books/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body);
    if (updatedBook) {
      res.send("Updated");
    } else {
      res.status(404).send("Book not found");
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));