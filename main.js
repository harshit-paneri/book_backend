const express = require("express");

const app = express();

// Datat Set
const books = [
    {
        id: 1,
        title: 'Rich Dad Poor Dad',
        author: 'Robert T. Kiyosaki',
        publisher: 'Warner Books Ed',
        genre: 'Personal Finance',
        publish_year: '1997',
        price: '19.99 USD',
        image_url: 'http://example.com/rich_dad_poor_dad.jpg'


    },
    {
        id: 2,
        title: 'To kill a mocking bird',
        author: 'Harpee lee',
        publisher: 'J.B.',
        genre: 'fiction',
        publish_year: '1960',
        price: '14.99 USD',
        image_url: 'http://example.com/to_kill_a_mockingbird.jpg'

    },
    {
        id: 3,
        title: '1984',
        author: 'George oswall',
        publisher: 'S & W',
        genre: 'horror',
        publish_year: '1949',
        price: '16.99 USD',
        image_url: 'http://example.com/1984.jpg'

    },
]

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});
app.listen(3000, () => console.log("Server running on port 3000"));