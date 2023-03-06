const express = require("express");
var bodyParser = require("body-parser");

//Database
const database = require("./database");
const res = require("express/lib/response");

//Initialise express
const booky = express();

booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());
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

/*
route        /book/new
description  add new books
access        public
parameter     none
methods       post
*/

booky.post("/book/new", (req,res) => {
    const newBook = req.body;
    database.books.push(newBook);
    return res.json({updatedBooks: database.books});
});

/*
route        /author/new
description  add new authors
access        public
parameter     none
methods       post
*/
booky.post("/author/new", (req,res) => {
    const newAuthor = req.body;
    database.author.push(newAuthor);
    return res.json(database.author);
});

/*
route        /publication/new
description  add new publication
access        public
parameter     none
methods       post
*/
booky.post("/publication/new", (req,res) => {
    const newPublication = req.body;
    database.publication.push(newPublication);
    return res.json(database.publication);
});

/*
route        /publication/update/book
description  update /add new publication
access        public
parameter     none
methods       put
*/

booky.put("/publication/update/book/:isbn", (req,res) => {
    // update the publication database
    database.publication.forEach((pub) => {
        if(pub.id === req.body.pubId) {
            return pub.books.push(req.params.isbn);
        }
    });

    // update the book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn) {
            book.publications = req.body.pubId;
            return;
        }
    });

    return res.json(
        {
            books: database.books,
            publications: database.publication,
            message: "Successfully updated publications"
        });
});

/***DELETE******/
/*
route        /book/delete
description  delete a book
access        public
parameter     isbn
methods       delete
*/
booky.delete("/book/delete/:isbn", (req,res) => {
    //whichever book that does not match with the isbn, just send it to an updatedBookDatabase array and rest will be filtered out.
     
    const updatedBookDatabase = database.books.filter(
        (book) => book.ISBN !== req.params.isbn
    )
    database.books = updatedBookDatabase;
    
    return res.json({books: database.books});
});

/*
route        /book/delete/author/:authorId
description  delete a book
access        public
parameter     authorId
methods       delete
*/
booky.delete("/book/delete/author/:authorId", (req,res) => {
    const updatedAuthorDatabase = database.author.filter(
        (author) => author.id !== req.params.authorId
    )
    database.author = updatedAuthorDatabase;

    return res.json({authors: database.author});
});


/*
route        /book/delete/author
description  delete an author from a book and vice versa
access        public
parameter     isbn, authorId
methods       delete
*/

booky.delete("/book/delete/author/:isbn/:authorId", (req,res) => {
    // Update the book database
database.books.forEach((book) => {
    if(book.ISBN === req.params.isbn) {
        const newAuthorList = book.author.filter(
            (eachAuthor) => eachAuthor !== parseInt(req.params.authorId)
        );
        book.author = newAuthorList;
        return;
    }
});

    // Update the author database
    database.author.forEach((eachAuthor) => {
        if(eachAuthor.id === parseInt(req.params.authorId)) {
            const newBookList = eachAuthor.books.filter(
                (book) => book !== req.params.isbn
            );
            eachAuthor.books = newBookList;
            return;
        }
    });

    return res.json({
        book: database.books,
        author: database.author,
        message: "Author was deleted "
    });
});


booky.listen(8080,() => {
    console.log("server is running on port 8080");
});

