import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState('$0');

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    // Calculate total
    const calculatedTotal = cartItems.reduce((sum, item) => {
      // Remove $ sign and convert to number
      const price = parseFloat(item.price.replace('$', ''));
      return sum + price;
    }, 0);
    
    setTotal(`$${calculatedTotal.toFixed(2)}`);
  }, [cartItems]);

  const addToCart = (course) => {
    // Check if course is already in cart
    const existingItem = cartItems.find(item => item.id === course.id);
    
    if (existingItem) {
      // If already in cart, do nothing or show a notification
      return;
    }
    
    // Add to cart
    setCartItems([...cartItems, course]);
  };

  const removeFromCart = (courseId) => {
    setCartItems(cartItems.filter(item => item.id !== courseId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const value = {
    cartItems,
    total,
    addToCart,
    removeFromCart,
    clearCart,
    itemCount: cartItems.length
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext; 