import { CartEntry, CartEntryKey } from "src/app/slices/cart/types";

const getCartEntryKey = (cartEntry: Omit<CartEntry, "key">): CartEntryKey => {
  return `${cartEntry.name}-${cartEntry.size}`;
};

export default getCartEntryKey;
