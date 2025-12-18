const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();



public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
// Task 10: Get all books using async/await
public_users.get("/async/books", async (req, res) => {
    try {
        const getBooks = new Promise((resolve, reject) => {
            resolve(books);
        });

        const result = await getBooks;
        res.send(JSON.stringify(result, null, 4));
    } catch (error) {
        res.status(500).json({ message: "Error fetching books" });
    }
});

// Task 11: Get book by ISBN using async/await
public_users.get("/async/isbn/:isbn", async (req, res) => {
    try {
        const isbn = req.params.isbn;

        const getBookByISBN = new Promise((resolve, reject) => {
            if (books[isbn]) {
                resolve(books[isbn]);
            } else {
                reject("Book not found");
            }
        });

        const result = await getBookByISBN;
        res.send(result);
    } catch (error) {
        res.status(404).json({ message: error });
    }
});


// Task 12: Get books by author using async/await
public_users.get("/async/author/:author", async (req, res) => {
    try {
        const author = req.params.author.toLowerCase();

        const getBooksByAuthor = new Promise((resolve, reject) => {
            let result = [];

            for (let key in books) {
                if (books[key].author.toLowerCase() === author) {
                    result.push(books[key]);
                }
            }

            if (result.length > 0) {
                resolve(result);
            } else {
                reject("No books found");
            }
        });

        const response = await getBooksByAuthor;
        res.send(JSON.stringify(response, null, 4));
    } catch (error) {
        res.status(404).json({ message: error });
    }
});

// Task 13: Get books by title using async/await
public_users.get("/async/title/:title", async (req, res) => {
    try {
        const title = req.params.title.toLowerCase();

        const getBooksByTitle = new Promise((resolve, reject) => {
            let result = [];

            for (let key in books) {
                if (books[key].title.toLowerCase() === title) {
                    result.push(books[key]);
                }
            }

            if (result.length > 0) {
                resolve(result);
            } else {
                reject("No books found");
            }
        });

        const response = await getBooksByTitle;
        res.send(JSON.stringify(response, null, 4));
    } catch (error) {
        res.status(404).json({ message: error });
    }
});



// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;

    if (books[isbn]) {
        res.send(books[isbn]);
    } else {
        res.send({ message: "Book not found" });
    }
});


  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    let result = [];

    for (let key in books) {
        if (books[key].author === author) {
            result.push(books[key]);
        }
    }

    res.send(JSON.stringify(result, null, 4));
});


// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title.toLowerCase();
    let result = [];

    for (let key in books) {
        if (books[key].title.toLowerCase() === title) {
            result.push(books[key]);
        }
    }

    if (result.length > 0) {
        res.send(JSON.stringify(result, null, 4));
    } else {
        res.send({ message: "No books found" });
    }
});




//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;

    if (books[isbn] && books[isbn].reviews) {
        res.send(books[isbn].reviews);
    } else {
        res.send({ message: "No reviews found for this book." });
    }
});


module.exports.general = public_users;
