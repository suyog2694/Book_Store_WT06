const { pool } = require("../config/db");

// =====================================================
// GET CART
// =====================================================

const getCart = async (req, res, next) => {
    try {
        const [items] = await pool.execute(
            `SELECT
                cart.id AS cart_id,
                cart.book_id,
                cart.quantity,
                books.title,
                books.author,
                books.mrp,
                books.image_url,
                books.category,
                (books.mrp * cart.quantity) AS subtotal
             FROM cart
             INNER JOIN books
                ON cart.book_id = books.id
             WHERE cart.user_id = ?
             ORDER BY cart.added_at DESC`,
            [req.userId]
        );

        const total = items.reduce(
            (sum, item) => sum + Number(item.subtotal),
            0
        );

        res.json({
            success: true,
            items,
            total: Number(total.toFixed(2))
        });

    } catch (error) {
        next(error);
    }
};


// =====================================================
// ADD TO CART
// =====================================================

const addToCart = async (req, res, next) => {
    try {
        const { book_id, quantity = 1 } = req.body;

        if (!book_id) {
            return res.status(400).json({
                success: false,
                message: "Book ID is required."
            });
        }

        const requestedQuantity = Number(quantity);

        if (
            !Number.isInteger(requestedQuantity) ||
            requestedQuantity <= 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be a positive integer."
            });
        }

        // Check book exists
        const [books] = await pool.execute(
            "SELECT id FROM books WHERE id = ?",
            [book_id]
        );

        if (books.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Book not found."
            });
        }

        // Check existing cart item
        const [existingItems] = await pool.execute(
            `SELECT id, quantity
             FROM cart
             WHERE user_id = ? AND book_id = ?`,
            [req.userId, book_id]
        );

        if (existingItems.length > 0) {

            const newQuantity =
                existingItems[0].quantity + requestedQuantity;

            await pool.execute(
                `UPDATE cart
                 SET quantity = ?
                 WHERE user_id = ? AND book_id = ?`,
                [newQuantity, req.userId, book_id]
            );

        } else {

            await pool.execute(
                `INSERT INTO cart
                 (user_id, book_id, quantity)
                 VALUES (?, ?, ?)`,
                [req.userId, book_id, requestedQuantity]
            );
        }

        res.status(201).json({
            success: true,
            message: "Book added to cart."
        });

    } catch (error) {
        next(error);
    }
};


// =====================================================
// UPDATE CART QUANTITY
// =====================================================

const updateCartItem = async (req, res, next) => {
    try {
        const { bookId } = req.params;
        const { quantity } = req.body;

        const newQuantity = Number(quantity);

        if (
            !Number.isInteger(newQuantity) ||
            newQuantity <= 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be a positive integer."
            });
        }

        const [result] = await pool.execute(
            `UPDATE cart
             SET quantity = ?
             WHERE user_id = ? AND book_id = ?`,
            [newQuantity, req.userId, bookId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found."
            });
        }

        res.json({
            success: true,
            message: "Cart updated successfully."
        });

    } catch (error) {
        next(error);
    }
};


// =====================================================
// REMOVE FROM CART
// =====================================================

const removeFromCart = async (req, res, next) => {
    try {
        const { bookId } = req.params;

        const [result] = await pool.execute(
            `DELETE FROM cart
             WHERE user_id = ? AND book_id = ?`,
            [req.userId, bookId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found."
            });
        }

        res.json({
            success: true,
            message: "Book removed from cart."
        });

    } catch (error) {
        next(error);
    }
};


module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart
};