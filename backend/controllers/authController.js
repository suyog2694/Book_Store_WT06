const bcrypt = require("bcryptjs");
const { pool } = require("../config/db");
const generateToken = require("../utils/generateToken");

// =====================================================
// REGISTER
// =====================================================

const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Basic validation
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required."
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must contain at least 6 characters."
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        // Check existing user
        const [existingUsers] = await pool.execute(
            "SELECT id FROM users WHERE email = ?",
            [normalizedEmail]
        );

        if (existingUsers.length > 0) {
            return res.status(409).json({
                success: false,
                message: "An account with this email already exists."
            });
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // Insert user
        const [result] = await pool.execute(
            `INSERT INTO users 
             (name, email, password_hash)
             VALUES (?, ?, ?)`,
            [name.trim(), normalizedEmail, passwordHash]
        );

        // Generate JWT
        const token = generateToken(result.insertId);

        res.status(201).json({
            success: true,
            message: "Registration successful.",
            token,
            user: {
                id: result.insertId,
                name: name.trim(),
                email: normalizedEmail
            }
        });

    } catch (error) {
        next(error);
    }
};


// =====================================================
// LOGIN
// =====================================================

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required."
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        // Find user
        const [users] = await pool.execute(
            `SELECT id, name, email, password_hash
             FROM users
             WHERE email = ?`,
            [normalizedEmail]
        );

        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        const user = users[0];

        // Compare password
        const passwordMatch = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        // Generate token
        const token = generateToken(user.id);

        res.json({
            success: true,
            message: "Login successful.",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        next(error);
    }
};


// =====================================================
// GET CURRENT USER
// =====================================================

const getCurrentUser = async (req, res, next) => {
    try {
        const [users] = await pool.execute(
            `SELECT id, name, email, created_at
             FROM users
             WHERE id = ?`,
            [req.userId]
        );

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        res.json({
            success: true,
            user: users[0]
        });

    } catch (error) {
        next(error);
    }
};


module.exports = {
    registerUser,
    loginUser,
    getCurrentUser
};