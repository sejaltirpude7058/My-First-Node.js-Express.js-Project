const express = require("express");

//Database
const database = require("./database");

//Initialise express
const booky = express();
/*
route        /a
description  get all books
access        public
parameter     none
methods       GET
*/

booky.get("/a", (req, res) => {
    return res.json({books: database.books});
});

/*
route        /is/:isbn
description  get a specific book
access        public
parameter     none
methods       GET
*/
booky.get("/is/:isbn", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn
    );
    if (getSpecificBook.length === 0) {
        return res.json({error: `No book found for ISBN of ${req.params.isbn}`});
    }
    return res.json({book: getSpecificBook});
});

/*
route        /c/:category
description  To get a list of books based on category
access        public
parameter     none
methods       GET
*/
booky.get("/c/:category", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.category.includes(req.params.category)
    )

    if(getSpecificBook.length === 0) {
        return res.json({error: `No book found for category ${req.params.category}`});
    }
    return res.json({book: getSpecificBook});
});

/*
route        /lan/:language
description  To get a list of books based on languages
access        public
parameter     none
methods       GET
*/
booky.get("/lan/:language", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.language === req.params.language
    )
    if (getSpecificBook.length === 0) {
        return res.json({error: `No book found for Language of ${req.params.language}`});
    }
    return res.json({book: getSpecificBook});
});

/*
route        /author
description  get all authors
access        public
parameter     none
methods       GET
*/

booky.get("/author", (req, res) => {
    return res.json({authors: database.author});
});


/*
route        /author/book
description  get all authors based on books
access        public
parameter     isbn
methods       GET
*/

booky.get("/author/book/:isbn", (req, res) => {
    const getSpecificAuthor = database.author.filter(
        (author) => author.books.includes(req.params.isbn)

    );
    if(getSpecificAuthor.length === 0) {
        return res.json({error: `No author found of the book ${req.params.isbn}`});
    };
    return res.json({authors: getSpecificAuthor});
});

/*
route        /book/:author
description  get specific author
access        public
parameter     author
methods       GET
*/
booky.get("/author/:name", (req, res) => {
    const getSpecificAuthor = database.author.filter(
        (author) => author.name === req.params.name
    )
    if (getSpecificAuthor.length === 0) {
        return res.json({error: `No book found for author of ${req.params.author}`});
    }
    return res.json({author: getSpecificAuthor});
});

/*
route        /publications
description  get all publications
access        public
parameter     none
methods       GET
*/
booky.get("/publications", (req, res) => {
    return res.json({publications: database.publication});
});

/*
route        /pub/:id
description  To get a specific publication
access        public
parameter     none
methods       GET
*/
booky.get("/publication/book/:id", (req, res) => {
    const getSpecificPublication = database.publication.filter(
        (publication) => publication.id === req.params.id
    );
    if (getSpecificPublication.length === 0) {
        return res.json({error: `No specific publication found for ${req.params.id}`});
    }
    return res.json({book: getSpecificPublication});
});



/*
route        /pub/book/:isbn
description  To get a list of publications based on a book
access        public
parameter     isbn
methods       GET
*/
booky.get("/pub/book/:isbn", (req, res) => {
    const getSpecificPublication = database.publication.filter(
        (publication) => publication.books.includes(req.params.isbn)

    );
    if(getSpecificPublication.length === 0) {
        return res.json({error: `No list found of publication based on book ${req.params.isbn}`});
    };
    return res.json({publication: getSpecificPublication});
});


booky.listen(8080,() => {
    console.log("server is running on port 8080");
});

