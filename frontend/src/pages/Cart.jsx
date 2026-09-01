import { Link, useNavigate } from "react-router-dom";
import { LockKeyhole, Minus, Plus, ShoppingBag, Trash2, Truck } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { checkoutCart } from "../services/orderService";
import "../styles/cart.css";

const Cart = () => {
  const {
    cartItems,
    totalPrice,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const handleBuy = async () => {
    if (!cartItems.length) {
      alert("Your cart is empty.");
      return;
    }

    try {
      setCheckoutLoading(true);

      const data = await checkoutCart();

      if (data.success) {
        // Clear frontend cart only after backend succeeds
        clearCart();

        alert("Order placed successfully!");

        navigate("/orders");
      } else {
        alert(
          data.message || "Failed to place order."
        );
      }
    } catch (error) {
      console.error("Checkout error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to place order. Please try again."
      );
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (!cartItems.length) {
    return (
      <main className="container cart-page empty-cart">
        <ShoppingBag size={42} className="empty-cart-icon" />
        <h1>Your cart is empty.</h1>

        <p>
          Browse your favorite books and add them here.
        </p>

        <Link
          to="/catalogue"
          className="primary-btn"
        >
          Browse Books
        </Link>
      </main>
    );
  }

  return (
    <main className="container cart-page section-block">

      <div className="section-heading">
        <span className="eyebrow accent">
          Your cart
        </span>

        <h2><ShoppingBag size={25} /> Ready to checkout</h2>
        <div className="cart-trust-row"><span><Truck size={16} /> Free delivery</span><span><LockKeyhole size={16} /> Secure checkout</span></div>
      </div>

      <div className="cart-layout">

        {/* ================= CART ITEMS ================= */}

        <div className="cart-items">

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="cart-item"
            >

              <img
                src={
                  item.image_url ||
                  "/images/books/placeholder.svg"
                }
                alt={item.title}
                onError={(e) => {
                  e.currentTarget.src =
                    "/images/books/placeholder.svg";
                }}
              />

              <div className="cart-item-info">

                <h3>{item.title}</h3>

                <p>{item.author}</p>

                <span>
                  ₹
                  {Number(
                    item.mrp || item.price || 0
                  ).toFixed(2)}
                </span>

              </div>

              {/* QUANTITY */}

              <div className="qty-control">

                <button
                  type="button"
                  onClick={() =>
                    updateQuantity(
                      item.book_id,
                      Number(item.quantity) - 1
                    )
                  }
                >
                  <Minus size={14} />
                </button>

                <span>
                  {item.quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    updateQuantity(
                      item.book_id,
                      Number(item.quantity) + 1
                    )
                  }
                >
                  <Plus size={14} />
                </button>

              </div>

              {/* REMOVE */}

              <button
                type="button"
                className="remove-btn"
                onClick={() =>
                  removeFromCart(item.book_id)
                }
              >
                <Trash2 size={16} />
              </button>

            </div>
          ))}

        </div>

        {/* ================= SUMMARY ================= */}

        <aside className="cart-summary">

          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Subtotal</span>

            <span>
              ₹{Number(totalPrice).toFixed(2)}
            </span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>

            <span>Free</span>
          </div>

          <div className="summary-row total-row">
            <span>Total</span>

            <strong>
              ₹{Number(totalPrice).toFixed(2)}
            </strong>
          </div>

          <button
            type="button"
            className="primary-btn"
            onClick={handleBuy}
            disabled={checkoutLoading}
          >
            {checkoutLoading
              ? "Processing..."
              : "Proceed to Buy"}
          </button>

        </aside>

      </div>

    </main>
  );
};

export default Cart;