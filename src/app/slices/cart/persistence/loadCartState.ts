import { CART_STATE_LOCAL_STORAGE_KEY } from "src/app/slices/cart/persistence/saveCartState";
import { CartState } from "src/app/slices/cart/types";

const DEFAULT_CART_STATE: CartState = {
  cartItems: [],
};

const loadCartState = (): CartState => {
  const item = localStorage.getItem(CART_STATE_LOCAL_STORAGE_KEY);
  if (!item) {
    return DEFAULT_CART_STATE;
  }
  try {
    return JSON.parse(item);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return DEFAULT_CART_STATE;
  }
};

export default loadCartState;
