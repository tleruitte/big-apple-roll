import { CART_STATE_LOCAL_STORAGE_KEY } from "src/app/slices/cart/persistence/loadCartState";
import { CartState } from "src/app/slices/cart/types";

const saveCartState = (cartState: CartState) => {
  if (typeof localStorage === "undefined") {
    return;
  }

  localStorage.setItem(CART_STATE_LOCAL_STORAGE_KEY, JSON.stringify(cartState));
};

export default saveCartState;
