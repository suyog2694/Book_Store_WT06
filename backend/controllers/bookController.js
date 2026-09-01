const { pool } = require("../config/db");

// =====================================================
// GET ALL BOOKS
// =====================================================

const getBooks = async (req, res, next) => {
    try {
        const { category, search } = req.query;

        let query = `
            SELECT 
                id,
                title,
                author,
                description,
                mrp,
                image_url,
                category,
                created_at
            FROM books
        `;

        const conditions = [];
        const values = [];

        // Category filter
        if (category) {
            conditions.push("category = ?");
            values.push(category);
        }

        // Search
        if (search) {
            conditions.push(`
                (
                    title LIKE ?
                    OR author LIKE ?
                    OR category LIKE ?
                )
            `);

            const searchValue = `%${search}%`;

            values.push(
                searchValue,
                searchValue,
                searchValue
            );
        }

        if (conditions.length > 0) {
            query += " WHERE " + conditions.join(" AND ");
        }

        query += " ORDER BY created_at DESC";

        const [books] = await pool.execute(query, values);

        res.json({
            success: true,
            count: books.length,
            books
        });

    } catch (error) {
        next(error);
    }
};


// =====================================================
// GET SINGLE BOOK
// =====================================================

const getBookById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [books] = await pool.execute(
            `SELECT 
                id,
                title,
                author,
                description,
                mrp,
                image_url,
                category,
                created_at
             FROM books
             WHERE id = ?`,
            [id]
        );

        if (books.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Book not found."
            });
        }

        res.json({
            success: true,
            book: books[0]
        });

    } catch (error) {
        next(error);
    }
};


module.exports = {
    getBooks,
    getBookById
};