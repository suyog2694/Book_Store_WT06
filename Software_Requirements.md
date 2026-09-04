# MyBooks Software Requirements

## 1. Project Overview

MyBooks is a full-stack online bookstore application. It provides a React-based web interface, an Express.js REST API, and a MySQL database for storing users, books, shopping carts, and orders.

## 2. Objectives

1. Provide users with a simple and responsive platform to browse and view available books.
2. Allow users to create accounts, log in securely, and manage their profiles.
3. Enable authenticated users to add books to a shopping cart and update cart quantities.
4. Allow users to place orders and view their previous order information and status.

## 3. Software Requirements

### 3.1 Operating System

- Windows, Linux, or macOS.
- A command-line terminal such as PowerShell, Command Prompt, or a Unix shell.

### 3.2 Development Software

- Visual Studio Code or another JavaScript-compatible code editor.
- Node.js with npm.
- MySQL Server and a MySQL client such as MySQL Workbench or the MySQL command-line client.
- A modern web browser such as Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari.
- Git, recommended for source-code version control.

### 3.3 Frontend Software

- React 19.
- Vite 8 as the frontend development and build tool.
- React Router for page navigation.
- Axios for HTTP communication with the backend API.
- Lucide React for interface icons.

### 3.4 Backend Software

- Node.js runtime.
- Express 5 for the REST API server.
- MySQL2 for database connectivity.
- JSON Web Token (JWT) for authentication tokens.
- bcryptjs for password hashing.
- CORS for frontend-backend communication.
- dotenv for environment-variable configuration.

### 3.5 Database Software

- MySQL Server.
- The database schema and sample records are provided in the `database` folder.

## 4. Technical Requirements

### 4.1 System Architecture

- The application shall use a three-layer structure: React frontend, Express backend API, and MySQL database.
- The frontend shall communicate with the backend through HTTP requests.
- The backend shall expose separate API areas for authentication, books, cart operations, and orders.
- Database credentials and runtime settings shall be stored in environment variables rather than hard-coded in source files.

### 4.2 Runtime and Configuration

- The frontend development server shall run on `http://localhost:5173`.
- The backend server shall run on port `5000` by default and may use a custom port through the `PORT` environment variable.
- The backend shall connect to MySQL using `DB_HOST`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME` environment variables.
- The backend shall accept and return JSON data for API requests and responses.

### 4.3 Functional Requirements

- Users shall be able to register and log in.
- Passwords shall be stored as hashes, not as plain text.
- Authenticated requests shall be protected using JWT-based authentication.
- Users shall be able to browse the book catalogue and view book details.
- Authenticated users shall be able to add, update, and remove cart items.
- Users shall be able to place orders from their cart.
- Users shall be able to view order history and order status.
- Unauthenticated users shall be prevented from accessing protected pages such as the cart, orders, and profile.
- Invalid routes and server errors shall return appropriate error responses.

### 4.4 Database Requirements

- The database shall contain tables for `users`, `books`, `cart_items`, `orders`, and `order_items`.
- User and book records shall have unique identifiers.
- Foreign-key relationships shall maintain links between users, books, carts, orders, and order items.
- Book records shall support title, author, price, category, description, image URL, and stock quantity.
- Order records shall store the user, total amount, status, and creation time.

### 4.5 Quality and Security Requirements

- The interface shall be usable on current desktop and mobile browsers.
- API errors shall be handled consistently by the backend error middleware.
- CORS shall allow the configured frontend origin to communicate with the backend.
- Authentication tokens shall be handled securely by the client and validated by protected backend routes.
- Database queries shall use the MySQL2 connection pool and parameterized values where applicable.
- The frontend shall pass the configured ESLint checks and production build.

## 5. Assumptions and Constraints

- MySQL is installed and running before the backend is started.
- The database schema is created before using catalogue, cart, or order functionality.
- The frontend and backend are run as separate applications during development.
- Payment processing is outside the current scope of the application.
- Product administration and inventory-management screens are outside the current scope unless added later.
