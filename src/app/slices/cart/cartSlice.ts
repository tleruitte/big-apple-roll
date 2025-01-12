import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CartState } from "src/app/slices/cart/types";

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    incrementCartItem: (state, action: PayloadAction<{ shopItemId: string; size: string }>) => {
      const existingItemIndex = state.cartItems.findIndex((cartItem) => {
        return (
          cartItem.shopItemId === action.payload.shopItemId && cartItem.size === action.payload.size
        );
      });
      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex].count += 1;
      } else {
        state.cartItems.push({
          shopItemId: action.payload.shopItemId,
          size: action.payload.size,
          count: 1,
        });
      }
    },
    decrementCartItem: (state, action: PayloadAction<{ shopItemId: string; size: string }>) => {
      const existingItemIndex = state.cartItems.findIndex((cartItem) => {
        return (
          cartItem.shopItemId === action.payload.shopItemId && cartItem.size === action.payload.size
        );
      });
      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex].count -= 1;
        if (state.cartItems[existingItemIndex].count === 0) {
          state.cartItems = state.cartItems.filter((item) => {
            return item !== state.cartItems[existingItemIndex];
          });
        }
      }
    },
    removeCartItem: (state, action: PayloadAction<{ shopItemId: string; size: string }>) => {
      state.cartItems = state.cartItems.filter((item) => {
        return item !== action.payload;
      });
    },
  },
});

export default cartSlice;
