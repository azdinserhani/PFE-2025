import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  total: 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Always add the item to cart, even if it already exists
      state.items.push(action.payload);
      // Recalculate total after adding item
      state.total = state.items.reduce((total, item) => total + parseFloat(item.price), 0);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.total = state.items.reduce((total, item) => total + parseFloat(item.price), 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
    setCartItems: (state, action) => {
      state.items = action.payload;
      
      // Calculate total
      const calculatedTotal = state.items.reduce((sum, item) => {
        const price = parseFloat(item.price.replace('$', ''));
        return sum + price;
      }, 0);
      
      state.total = `$${calculatedTotal.toFixed(2)}`;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, setCartItems } = cartSlice.actions;

export default cartSlice.reducer; 