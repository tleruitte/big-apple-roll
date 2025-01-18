import { createSelector } from "@reduxjs/toolkit";
import { compact } from "lodash";

import { CartEntry, CartState } from "src/app/slices/cart/types";
import { AppState } from "src/app/types";

const selectCartEntries = createSelector(
  (state: AppState) => {
    return state.cart.cartEntriesByKey;
  },
  (cartEntriesByKey: CartState["cartEntriesByKey"]): Array<CartEntry> => {
    return compact(Object.values(cartEntriesByKey));
  },
);

export default selectCartEntries;
