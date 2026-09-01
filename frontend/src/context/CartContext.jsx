import { createContext, useContext, useEffect, useState } from 'react';
import {
  getCart,
  addToCart as addToCartAPI,
  updateCart as updateCartAPI,
  removeFromCart as removeFromCartAPI,
} from '../services/cartService';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load cart from MySQL after login
  useEffect(() => {
    if (!isAuthenticated) {
      setCartItems([]);
      return;
    }

    const loadCart = async () => {
      try {
        setLoading(true);

        const data = await getCart();

        if (data.success) {
          setCartItems(data.items);
        }
      } catch (error) {
        console.error('Failed to load cart:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [isAuthenticated]);

  // Add book
  const addToCart = async (book) => {
    try {
      const data = await addToCartAPI(book.id, 1);

      if (data.success) {
        const updatedCart = await getCart();

        if (updatedCart.success) {
          setCartItems(updatedCart.items);
        }
      }

      return data;
    } catch (error) {
      console.error('Failed to add book to cart:', error);
      throw error;
    }
  };

  // Update quantity
  const updateQuantity = async (bookId, quantity) => {
    try {
      if (quantity <= 0) {
        await removeFromCartAPI(bookId);
      } else {
        await updateCartAPI(bookId, quantity);
      }

      const updatedCart = await getCart();

      if (updatedCart.success) {
        setCartItems(updatedCart.items);
      }
    } catch (error) {
      console.error('Failed to update cart:', error);
      throw error;
    }
  };

  // Remove book
  const removeFromCart = async (bookId) => {
    try {
      await removeFromCartAPI(bookId);

      setCartItems((currentItems) =>
        currentItems.filter(
          (item) => item.book_id !== bookId
        )
      );
    } catch (error) {
      console.error('Failed to remove book:', error);
      throw error;
    }
  };

  // Clear cart locally after successful checkout
  const clearCart = () => {
    setCartItems([]);
  };

  // Total number of books
  const totalItems = cartItems.reduce(
    (total, item) => total + Number(item.quantity),
    0
  );

  // Total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.subtotal),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};