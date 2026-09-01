import { useNavigate } from "react-router-dom";
import { ShoppingCart, Eye } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/orderService";
import "../styles/catalogue.css";

const BookCard = ({ book, onViewDetails }) => {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      await addToCart(book);
      alert("Book added to cart successfully!");
    } catch (error) {
      console.error("Add to cart error:", error);
      alert(
        error.response?.data?.message ||
          "Failed to add book to cart."
      );
    }
  };

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      const data = await createOrder(book.id, 1);

      if (data.success) {
        alert("Order placed successfully!");
        navigate("/orders");
      } else {
        alert(data.message || "Failed to place order.");
      }
    } catch (error) {
      console.error("Buy now error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to place order."
      );
    }
  };

  const imageSource =
    book.image_url || "/images/books/placeholder.jpg";

  return (
    <article className="book-card">
      <div className="book-image-box">
        <img
          src={imageSource}
          alt={book.title}
          onError={(e) => {
            e.currentTarget.src =
              "/images/books/placeholder.jpg";
          }}
        />
      </div>

      <div className="book-card-body">
        <span className="book-category">
          {book.category}
        </span>

        <h3>{book.title}</h3>

        <p className="book-author">
          {book.author}
        </p>

        <div className="price-row">
          <strong>
            ₹{Number(book.mrp).toFixed(2)}
          </strong>
        </div>

        <div className="card-actions">
          <button
            type="button"
            className="outline-btn small-btn"
            onClick={onViewDetails || (() => {})}
          >
            <Eye size={16} />
            View Details
          </button>

          <button
            type="button"
            className="primary-btn small-btn"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>

          <button
            type="button"
            className="outline-btn small-btn"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
};

export default BookCard;