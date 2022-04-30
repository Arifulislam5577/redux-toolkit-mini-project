import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

const initialState = {
  cartItems: cartItems,
  total: 0,
  amount: 4,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    toggleIncAndDec: (state, action) => {
      const itemId = action.payload.id;
      const item = state.cartItems.find((item) => item.id === itemId);
      if (action.payload.sign === "plus") {
        item.amount = item.amount + 1;
      } else {
        item.amount = item.amount - 1;
      }
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;

      total = state.cartItems.reduce(
        (acc, item) => acc + item.amount * item.price,
        0
      );
      amount = state.cartItems.reduce((acc, item) => acc + item.amount, 0);

      state.amount = amount;
      state.total = total;
    },
  },
});

export const {
  clearCart,
  removeItem,
  toggleIncAndDec,
  calculateTotals,
} = cartSlice.actions;
export default cartSlice.reducer;
