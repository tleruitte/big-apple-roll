export type CartEntryKey = `${string}-${string}`;

export type CartEntry = {
  key: CartEntryKey;
  name: string;
  size: string;
  count: number;
};

export type CartState = {
  cartEntriesByKey: Partial<Record<CartEntryKey, CartEntry>>;
};
