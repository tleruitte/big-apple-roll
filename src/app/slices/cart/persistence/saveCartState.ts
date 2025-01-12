import { CartState } from "src/app/slices/cart/types";

export const CART_STATE_LOCAL_STORAGE_KEY = "cartState";

const saveCartState = (cartState: CartState) => {
  localStorage.setItem(CART_STATE_LOCAL_STORAGE_KEY, JSON.stringify(cartState));
};

export default saveCartState;
