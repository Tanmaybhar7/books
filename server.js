
const express = require("express");
const app = express();

app.use(express.json());


let books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 2, title: "Atomic Habits", author: "James Clear" }
];


app.get("/books", (req, res) => {
  res.json(books);
});

app.post("/books", (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: "Title and author are required" });
  }
  const newBook = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    title,
    author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});


app.put("/books/:id", (req, res) => {
  const { id } = req.params;
  const { title, author } = req.body;

  const book = books.find(b => b.id === parseInt(id));
  if (!book) return res.status(404).json({ message: "Book not found" });

  book.title = title || book.title;
  book.author = author || book.author;
  res.json(book);
});

app.delete("/books/:id", (req, res) => {
  const { id } = req.params;
  const index = books.findIndex(b => b.id === parseInt(id));
  if (index === -1) return res.status(404).json({ message: "Book not found" });

  books.splice(index, 1);
  res.json({ message: "Book deleted successfully" });
});


const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
