import { configureStore } from "@reduxjs/toolkit";

import listenerMiddleware from "src/app/middlewares/listenerMiddleware";
import cartSlice from "src/app/slices/cart/cartSlice";
import loadCartState from "src/app/slices/cart/persistence/loadCartState";

const store = configureStore({
  preloadedState: {
    cart: loadCartState(),
  },
  reducer: {
    cart: cartSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().prepend(listenerMiddleware.middleware);
  },
});

export default store;
