import { X, ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const BookDetails = ({ book, onClose }) => {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    addToCart(book);
    onClose();
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    addToCart(book);
    onClose();
    navigate('/cart');
  };

  return (
    <div className="details-overlay" onClick={onClose}>
      <div className="details-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="close-btn" onClick={onClose} aria-label="Close details">
          <X size={18} />
        </button>
        <div className="details-content">
          <img src={book.image_url || '/images/books/placeholder.jpg'} alt={book.title} onError={(e) => {
            e.currentTarget.src = '/images/books/placeholder.jpg';
          }} />
          <div className="details-copy">
            <span className="book-category">{book.category}</span>
            <h2>{book.title}</h2>
            <p className="book-author">by {book.author}</p>
            <p className="book-price">₹{book.mrp}</p>
            <p>{book.description}</p>
            <div className="modal-actions">
              <button type="button" className="primary-btn" onClick={handleAddToCart}>
                <ShoppingCart size={17} /> Add to Cart
              </button>
              <button type="button" className="outline-btn" onClick={handleBuyNow}>Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
