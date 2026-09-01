const express = require("express");

const {
    buyNow,
    checkoutCart,
    getMyOrders,
    getOrderById
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// All order routes require login

// POST /api/orders/buy-now
router.post("/buy-now", protect, buyNow);

// POST /api/orders/checkout
router.post("/checkout", protect, checkoutCart);

// GET /api/orders
router.get("/", protect, getMyOrders);

// GET /api/orders/:id
router.get("/:id", protect, getOrderById);

module.exports = router;