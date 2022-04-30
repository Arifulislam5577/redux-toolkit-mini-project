import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./features/Cart/CartSlice";
export const store = configureStore({
  reducer: {
    cart: CartReducer,
  },
});
