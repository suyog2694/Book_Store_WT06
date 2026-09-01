const express = require("express");

const {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart
} = require("../controllers/cartController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// All cart routes require login

// GET /api/cart
router.get("/", protect, getCart);

// POST /api/cart
router.post("/", protect, addToCart);

// PUT /api/cart/:bookId
router.put("/:bookId", protect, updateCartItem);

// DELETE /api/cart/:bookId
router.delete("/:bookId", protect, removeFromCart);

module.exports = router;