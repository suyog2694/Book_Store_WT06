const express = require("express");

const {
    getBooks,
    getBookById
} = require("../controllers/bookController");

const router = express.Router();

// GET /api/books
router.get("/", getBooks);

// GET /api/books/:id
router.get("/:id", getBookById);

module.exports = router;