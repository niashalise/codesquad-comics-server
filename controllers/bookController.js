const booksData = require("../data/books");

const getAllBooks = async (req, res, next) => {
    try {
        const books = booksData;
        return res.status(200).json({
            success: { message: "Retrieved all books." },
            data: books
        });
    } catch (error) {
        return res.status(400).json({
            error: { message: "There was an error when trying to get all of the books." }
        })
    }
}

const getBook = async (req, res, next) => {
    const { _id } = req.params;
    
    try {
        const book = booksData.find((book) => book._id === _id);

        return res.status(200).json({
            success: { message: "Book found successfully." },
            data: book
        });
    } catch (error) {
        return res.status(400).json({
            error: { message: "Book could not be found." }
        })
    }
}

const createBook = async (req, res, next) => {
    const { title, author, publisher, genre, pages, rating, synopsis, image } = req.body;

    try {
        const newBook = {
            title,
            author,
            publisher,
            genre,
            pages,
            rating,
            synopsis,
            image
        };
        res.status(201).json({
            success: { message: "A new book was created." },
            data: newBook
        });
    } catch (error) {
        res.status(400).json({
            error: { message: "There was an error when trying to create a new book." }
        });
    }
}

const updateBook = async (req, res, next) => {
    const { title, author, publisher, genre, pages, rating, synopsis, image } = req.body;
    const { _id } = req.params;

    try {
        const updatedBook = {
            title,
            author,
            publisher,
            genre,
            pages,
            rating,
            synopsis,
            image
        }; 
        return res.status(201).json({
            success: { message: "Book has been successfully updated." },
            data: updatedBook
        });
    } catch (error) {
        return res.status(400).json({
            error: { message: "There was an error when trying to update this book." }
        })
    }
}

const deleteBook = async (req, res, next) => {
    const { _id } = req.params;

    try {
        const books = booksData.filter((book) => book._id !== _id);

        return res.status(200).json({
            success: { message: "Book successfully deleted." },
            data: books
        });
    } catch (error) {
        return res.status(400).json({
            error: { message: "There was an error when trying to delete this book." }
        })
    }
}

module.exports = { getAllBooks, getBook, createBook, updateBook, deleteBook}