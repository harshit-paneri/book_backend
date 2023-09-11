const express = require("express");

const app = express();

// Datat Set
const books = [
    {
        id: 1,
        title: "Rich Dad Poor Dad",
        author: "Robert T. Kiyosaki",
        publisher: "Warner Books Ed",
        genre: "Personal Finance",
        publish_year: "1997",
        price: "19.99 USD",
        image_url: "http://example.com/rich_dad_poor_dad.jpg"


    },
    {
        id: 2,
        title: "To kill a mocking bird",
        author: "Harpee lee",
        publisher: "J.B.",
        genre: "fiction",
        publish_year: "1960",
        price: "14.99 USD",
        image_url: "http://example.com/to_kill_a_mockingbird.jpg"

    },
    {
        id: 3,
        title: "1984",
        author: "George oswall",
        publisher: "S & W",
        genre: "horror",
        publish_year: "1949",
        price: "16.99 USD",
        image_url: "http://example.com/1984.jpg"

    },
]

app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>");
});

// Get all books
app.get("/books", (req, res) => {
    res.send(books);
});

// Get a book by id
app.get("/books/:id", (req, res) => {
    const book = books.find(t=>t.id.toString()===req.params.id);
    if(book){
        res.json(book);
    }
    else{
        res.status(404).send("Book not found");
    }
});
//get book by name
app.get("/books/byTitle/:title", (req, res) => {
    // console.log(req.params.title);
    const book = books.find(t=>t.title===req.params.title);
    if(book){
        res.json(book);
    }else{
        res.status(404).send("Book not found");
    }
});

// create book on books
app.post("/books", (req,res)=>{
    const newBook = req.body
    newBook.id = Math.random();
    books.push(newBook);
    res.status(201).send("Book created");
});

// Delete Book
app.delete("/books/:id", (req,res)=>{
    const foundIndex = books.findIndex(t=>t.id.toString()===req.params.id)
    if(foundIndex>-1){
        books.splice(foundIndex,1)
        res.send('Deleted')
    }else{
        res.status(404).send("Book Not Found")
    }
})

// Update Book Details
app.patch("/books/:id", (req,res)=>{
    const id = req.params.id
    const data = req.body
    const foundIndex = books.findIndex(t=>t.id.toString()===req.params.id)

    if(foundIndex>-1){
        const old = books[foundIndex]
        books[foundIndex] = {
          ...old,
          ...data
        }
        res.send('Updated')
      } else {
        res.status(404).send('Not found')
      }
})

app.listen(3000, () => console.log("Server running on port 3000"));