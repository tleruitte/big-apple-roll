import { isAnyOf } from "@reduxjs/toolkit";

import { AppStartListening } from "src/app/middlewares/listenerMiddleware";
import cartSlice from "src/app/slices/cart/cartSlice";
import saveCartState from "src/app/slices/cart/persistence/saveCartState";

const addCartListeners = (startListening: AppStartListening) => {
  startListening({
    matcher: isAnyOf(
      cartSlice.actions.incrementCartItem,
      cartSlice.actions.decrementCartItem,
      cartSlice.actions.removeCartItem,
    ),
    effect: (action, api) => {
      saveCartState(api.getState().cart);
    },
  });
};

export default addCartListeners;
