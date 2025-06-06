const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

router.get("/all", getAllBooks);

router.get("/:_id", getBook);

// PATH: /create/new, HANDLER: "This will create a new book"
router.post("/create/new", createBook);

// PATH: /update/:id, HANDLER: "This will update a book by its id"
router.put("/edit/:_id", updateBook);

// PATH: /delete/:id, HANDLER: "This will delete a book by its id"
router.delete("/delete/:_id", deleteBook);

module.exports = router;
