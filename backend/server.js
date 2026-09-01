const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { testDatabaseConnection } = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

const errorHandler = require("./middleware/errorMiddleware");

const app = express();

const PORT = process.env.PORT || 5000;


// =====================================================
// MIDDLEWARE
// =====================================================

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// =====================================================
// API ROUTES
// =====================================================

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to MyBooks API",
        status: "Backend is running"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);


// =====================================================
// 404 HANDLER
// =====================================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API route not found."
    });
});


// =====================================================
// ERROR HANDLER
// =====================================================

app.use(errorHandler);


// =====================================================
// START SERVER
// =====================================================

const startServer = async () => {

    await testDatabaseConnection();

    app.listen(PORT, () => {
        console.log(
            `MyBooks backend running on http://localhost:${PORT}`
        );
    });
};

startServer();