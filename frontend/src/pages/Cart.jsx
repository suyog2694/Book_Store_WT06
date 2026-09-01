import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import '../styles/cart.css';

const Cart = () => {
  const { cartItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const handleBuy = () => {
    const order = {
      id: `MB-${Date.now()}`,
      date: new Date().toISOString(),
      total: totalPrice,
      status: 'PLACED',
      items: cartItems,
    };

    localStorage.setItem('mybooks-orders', JSON.stringify([order, ...(JSON.parse(localStorage.getItem('mybooks-orders') || '[]'))]));
    clearCart();
    navigate('/orders');
  };

  if (!cartItems.length) {
    return (
      <main className="container cart-page empty-cart">
        <h1>Your cart is empty.</h1>
        <p>Browse your favorite books and add them here.</p>
        <Link to="/catalogue" className="primary-btn">Browse Books</Link>
      </main>
    );
  }

  return (
    <main className="container cart-page section-block">
      <div className="section-heading">
        <span className="eyebrow accent">Your cart</span>
        <h2>Ready to checkout</h2>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image_url || '/images/books/placeholder.jpg'} alt={item.title} />

              <div className="cart-item-info">
                <h3>{item.title}</h3>
                <p>{item.author}</p>
                <span>₹{Number(item.mrp || item.price || 0)}</span>
              </div>

              <div className="qty-control">
                <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                  <Minus size={14} />
                </button>
                <span>{item.quantity}</span>
                <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  <Plus size={14} />
                </button>
              </div>

              <button type="button" className="remove-btn" onClick={() => removeFromCart(item.id)}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <aside className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{totalPrice}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-row total-row">
            <span>Total</span>
            <strong>₹{totalPrice}</strong>
          </div>
          <button type="button" className="primary-btn" onClick={handleBuy}>Proceed to Buy</button>
        </aside>
      </div>
    </main>
  );
};

export default Cart;
