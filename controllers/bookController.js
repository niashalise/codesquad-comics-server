// const booksData = require("../data/books");
const Book = require("../models/bookModel");

const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      success: { message: "Retrieved all books." },
      data: books,
    });
  } catch (error) {
    return next(error);
  }
};

const getBook = async (req, res, next) => {
  const { _id } = req.params;

  try {
    if (!_id) {
      throw new Error("Id is required.");
    }

    const book = await Book.findById(_id);

    if (!book) {
      throw new Error("Book not found.");
    }

    return res.status(200).json({
      success: { message: "Book found successfully." },
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

const createBook = async (req, res, next) => {
  const { title, author, publisher, genre, pages, rating, synopsis, image } =
    req.body;

  try {
    if (!title || !author || !pages) {
      throw new Error("Missing required information.");
    }

    const newBook = new Book({
      title,
      author,
      publisher,
      genre,
      pages,
      rating,
      synopsis,
      image,
    });

    await newBook.save();

    res.status(201).json({
      success: { message: "A new book was created." },
      data: newBook,
    });
  } catch (error) {
    return next(error);
  }
};

const updateBook = async (req, res, next) => {
  const { title, author, publisher, genre, pages, rating, synopsis, image } =
    req.body;
  const { _id } = req.params;

  try {
    if (!title || !author || !pages) {
      throw new Error("Missing required information.");
    }

    const updatedBook = await Book.findByIdAndUpdate(
      _id,
      { $set: { title, author, publisher, genre, rating, synopsis } },
      {
        new: true,
      }
    );

    if (!updatedBook) {
      throw new Error("Book not found.");
    }

    return res.status(201).json({
      success: { message: "Book has been successfully updated." },
      data: updatedBook,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteBook = async (req, res, next) => {
  const { _id } = req.params;

  try {
    if (!_id) {
      throw new Error("Id is required.");
    }

    const foundBook = await Book.findByIdAndDelete(_id);

    return res.status(200).json({
      success: { message: "Book successfully deleted." },
      data: foundBook,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getAllBooks, getBook, createBook, updateBook, deleteBook };
