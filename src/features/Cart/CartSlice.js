import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  cartItems: [],
  total: 0,
  amount: 4,
  isLoading: true,
};

const url = "https://course-api.com/react-useReducer-cart-project";

export const getCartItems = createAsyncThunk("cart/getCartItems", async () => {
  try {
    const res = await axios(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

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

  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
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
