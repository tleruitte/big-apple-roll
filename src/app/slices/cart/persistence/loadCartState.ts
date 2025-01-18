import { CartState } from "src/app/slices/cart/types";

export const CART_STATE_LOCAL_STORAGE_KEY = "cartState";

const DEFAULT_CART_STATE: CartState = {
  cartEntriesByKey: {},
};

const loadCartState = (): CartState => {
  if (typeof localStorage === "undefined") {
    return DEFAULT_CART_STATE;
  }

  const savedCartState = localStorage.getItem(CART_STATE_LOCAL_STORAGE_KEY);
  if (!savedCartState) {
    return DEFAULT_CART_STATE;
  }

  try {
    const parsedCartState = JSON.parse(savedCartState);
    return {
      ...DEFAULT_CART_STATE,
      ...parsedCartState,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return DEFAULT_CART_STATE;
  }
};

export default loadCartState;
