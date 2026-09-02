import React, { createContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { BasketAPI } from '../API/Basket';

export const CartContext = createContext();

const CART_KEY = 'cart';

const readLocalCart = () => {
  try {
    const saved = localStorage.getItem(CART_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => readLocalCart());
  const [loading, setLoading] = useState(true);
  const skipNextSync = useRef(true);

  useEffect(() => {
    const loadCart = async () => {
      const local = readLocalCart();
      try {
        const { data } = await axios.get(BasketAPI);
        const serverItems = Array.isArray(data) ? data : [];
        if (local.length > 0) {
          setCartItems(local);
          await Promise.all(local.map((item) => axios.post(BasketAPI, item).catch(() => {})));
        } else if (serverItems.length > 0) {
          setCartItems(serverItems);
          localStorage.setItem(CART_KEY, JSON.stringify(serverItems));
        }
      } catch {
        setCartItems(local);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));

    if (loading) return;

    if (skipNextSync.current) {
      skipNextSync.current = false;
      return;
    }

    const sync = async () => {
      try {
        const { data } = await axios.get(BasketAPI);
        const serverItems = Array.isArray(data) ? data : [];
        await Promise.all(
          serverItems.map((item) => axios.delete(`${BasketAPI}/${item.id}`).catch(() => {}))
        );
        await Promise.all(cartItems.map((item) => axios.post(BasketAPI, item).catch(() => {})));
      } catch {
      }
    };

    const timer = setTimeout(sync, 250);
    return () => clearTimeout(timer);
  }, [cartItems, loading]);

  const addToCart = (product, quantity = 1) => {
    if (!product) return;
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => String(item.id) === String(product.id));

      if (existingItem) {
        return prevItems.map((item) =>
          String(item.id) === String(product.id)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevItems, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => String(item.id) !== String(productId)));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        String(item.id) === String(productId) ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price?.toString().replace(/\s|₽/g, '') || '0');
      return total + price * item.quantity;
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
