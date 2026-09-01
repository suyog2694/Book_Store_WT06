USE mybooks;

INSERT INTO users (name, email, password) VALUES
('Alice Johnson', 'alice@example.com', 'hashed_password_1'),
('Bob Smith', 'bob@example.com', 'hashed_password_2');

INSERT INTO books (title, author, price, category, description, image_url, stock) VALUES
('The Alchemist', 'Paulo Coelho', 299.00, 'Fiction', 'A novel about following your dreams.', '/images/books/alchemist.jpg', 10),
('Atomic Habits', 'James Clear', 450.00, 'Self Help', 'A practical guide to building better habits.', '/images/books/atomic-habits.jpg', 8),
('Clean Code', 'Robert C. Martin', 520.00, 'Technology', 'A handbook of agile software craftsmanship.', '/images/books/clean-code.jpg', 6),
('The Pragmatic Programmer', 'Andrew Hunt', 480.00, 'Technology', 'A guide to software development best practices.', '/images/books/pragmatic.jpg', 5); 

INSERT INTO cart_items (user_id, book_id, quantity) VALUES
(1, 1, 1),
(1, 2, 2);

INSERT INTO orders (user_id, total, status) VALUES
(1, 749.00, 'pending'),
(2, 450.00, 'completed');

INSERT INTO order_items (order_id, book_id, quantity, price) VALUES
(1, 1, 1, 299.00),
(1, 2, 1, 450.00),
(2, 2, 1, 450.00);
