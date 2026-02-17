import { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const { data } = await api.getCart();
        setCart(data.cart);
        setCartCount(data.cart?.products?.length || 0);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const { data } = await api.addToCart({ productId, quantity });
      setCart(data.cart);
      setCartCount(data.cart.products.length);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to add to cart' };
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      const { data } = await api.updateCartItem(productId, { quantity });
      setCart(data.cart);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to update cart' };
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const { data } = await api.removeFromCart(productId);
      setCart(data.cart);
      setCartCount(data.cart.products.length);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to remove from cart' };
    }
  };

  const clearCart = async () => {
    try {
      await api.clearCart();
      setCart({ products: [] });
      setCartCount(0);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to clear cart' };
    }
  };

  const cartTotal = cart?.products?.reduce(
    (total, item) => total + (item.price || item.product?.price || item.product?.discountPrice || 0) * item.quantity,
    0
  ) || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        loading,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

