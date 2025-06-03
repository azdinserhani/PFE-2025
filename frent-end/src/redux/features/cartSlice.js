import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Always add the item to cart, even if it already exists
      state.items.push(action.payload);
      // Recalculate total after adding item
      state.total = state.items.reduce(
        (total, item) => total + parseFloat(item.price),
        0
      );
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.total = state.items.reduce(
        (total, item) => total + parseFloat(item.price),
        0
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
    setCartItems: (state, action) => {
      // Only keep valid properties for each item
      state.items = action.payload.map((item) => ({
        id: item.id,
        title: item.title,
        instructor: item.instructor,
        lessons: item.lessons,
        students: item.students,
        price:
          typeof item.price === "string"
            ? parseFloat(item.price.replace(/[^0-9.-]+/g, ""))
            : Number(item.price),
        image: item.image || "",
        // Add more properties as needed, but avoid nested objects
      }));

      // Calculate total
      const calculatedTotal = state.items.reduce((sum, item) => {
        let price = 0;
        if (typeof item.price === "string") {
          price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
        } else if (typeof item.price === "number") {
          price = item.price;
        }
        return sum + (isNaN(price) ? 0 : price);
      }, 0);

      state.total = calculatedTotal.toFixed(2);
    },
  },
});

export const { addToCart, removeFromCart, clearCart, setCartItems } =
  cartSlice.actions;

export default cartSlice.reducer;
