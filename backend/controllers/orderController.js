const { pool } = require("../config/db");

// =====================================================
// BUY NOW
// =====================================================

const buyNow = async (req, res, next) => {
    const connection = await pool.getConnection();

    try {
        const { book_id, quantity = 1 } = req.body;

        const requestedQuantity = Number(quantity);

        if (!book_id) {
            connection.release();

            return res.status(400).json({
                success: false,
                message: "Book ID is required."
            });
        }

        if (
            !Number.isInteger(requestedQuantity) ||
            requestedQuantity <= 0
        ) {
            connection.release();

            return res.status(400).json({
                success: false,
                message: "Quantity must be a positive integer."
            });
        }

        // Find book
        const [books] = await connection.execute(
            `SELECT id, title, mrp
             FROM books
             WHERE id = ?`,
            [book_id]
        );

        if (books.length === 0) {
            connection.release();

            return res.status(404).json({
                success: false,
                message: "Book not found."
            });
        }

        const book = books[0];

        const totalAmount =
            Number(book.mrp) * requestedQuantity;

        // Start transaction
        await connection.beginTransaction();

        // Create order
        const [orderResult] = await connection.execute(
            `INSERT INTO orders
             (user_id, total_amount, status)
             VALUES (?, ?, 'PLACED')`,
            [
                req.userId,
                totalAmount
            ]
        );

        const orderId = orderResult.insertId;

        // Create order item
        await connection.execute(
            `INSERT INTO order_items
             (order_id, book_id, quantity, price)
             VALUES (?, ?, ?, ?)`,
            [
                orderId,
                book_id,
                requestedQuantity,
                book.mrp
            ]
        );

        // Remove item from cart if it exists
        await connection.execute(
            `DELETE FROM cart
             WHERE user_id = ? AND book_id = ?`,
            [req.userId, book_id]
        );

        await connection.commit();

        connection.release();

        res.status(201).json({
            success: true,
            message: "Order placed successfully.",
            order: {
                id: orderId,
                book: book.title,
                quantity: requestedQuantity,
                total_amount: Number(totalAmount.toFixed(2)),
                status: "PLACED"
            }
        });

    } catch (error) {

        await connection.rollback();
        connection.release();

        next(error);
    }
};


// =====================================================
// CHECKOUT CART
// =====================================================

const checkoutCart = async (req, res, next) => {
    const connection = await pool.getConnection();

    try {
        // Get user's cart
        const [cartItems] = await connection.execute(
            `SELECT
                cart.book_id,
                cart.quantity,
                books.title,
                books.mrp
             FROM cart
             INNER JOIN books
                ON cart.book_id = books.id
             WHERE cart.user_id = ?`,
            [req.userId]
        );

        if (cartItems.length === 0) {
            connection.release();

            return res.status(400).json({
                success: false,
                message: "Your cart is empty."
            });
        }

        let totalAmount = 0;

        for (const item of cartItems) {
            totalAmount +=
                Number(item.mrp) * item.quantity;
        }

        await connection.beginTransaction();

        // Create order
        const [orderResult] = await connection.execute(
            `INSERT INTO orders
             (user_id, total_amount, status)
             VALUES (?, ?, 'PLACED')`,
            [
                req.userId,
                totalAmount
            ]
        );

        const orderId = orderResult.insertId;

        // Insert each cart item into order_items
        for (const item of cartItems) {

            await connection.execute(
                `INSERT INTO order_items
                 (order_id, book_id, quantity, price)
                 VALUES (?, ?, ?, ?)`,
                [
                    orderId,
                    item.book_id,
                    item.quantity,
                    item.mrp
                ]
            );
        }

        // Empty cart
        await connection.execute(
            `DELETE FROM cart
             WHERE user_id = ?`,
            [req.userId]
        );

        await connection.commit();

        connection.release();

        res.status(201).json({
            success: true,
            message: "Order placed successfully.",
            order: {
                id: orderId,
                total_amount: Number(totalAmount.toFixed(2)),
                status: "PLACED"
            }
        });

    } catch (error) {

        await connection.rollback();
        connection.release();

        next(error);
    }
};


// =====================================================
// GET MY ORDERS
// =====================================================

const getMyOrders = async (req, res, next) => {
    try {

        const [orders] = await pool.execute(
            `SELECT
                id,
                total_amount,
                status,
                ordered_at
             FROM orders
             WHERE user_id = ?
             ORDER BY ordered_at DESC`,
            [req.userId]
        );

        for (const order of orders) {

            const [items] = await pool.execute(
                `SELECT
                    order_items.book_id,
                    order_items.quantity,
                    order_items.price,
                    books.title,
                    books.author,
                    books.image_url
                 FROM order_items
                 INNER JOIN books
                    ON order_items.book_id = books.id
                 WHERE order_items.order_id = ?`,
                [order.id]
            );

            order.items = items;
        }

        res.json({
            success: true,
            orders
        });

    } catch (error) {
        next(error);
    }
};


// =====================================================
// GET SINGLE ORDER
// =====================================================

const getOrderById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [orders] = await pool.execute(
            `SELECT
                id,
                total_amount,
                status,
                ordered_at
             FROM orders
             WHERE id = ? AND user_id = ?`,
            [id, req.userId]
        );

        if (orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Order not found."
            });
        }

        const order = orders[0];

        const [items] = await pool.execute(
            `SELECT
                order_items.book_id,
                order_items.quantity,
                order_items.price,
                books.title,
                books.author,
                books.image_url
             FROM order_items
             INNER JOIN books
                ON order_items.book_id = books.id
             WHERE order_items.order_id = ?`,
            [id]
        );

        order.items = items;

        res.json({
            success: true,
            order
        });

    } catch (error) {
        next(error);
    }
};


module.exports = {
    buyNow,
    checkoutCart,
    getMyOrders,
    getOrderById
};