export type CartItem = {
  shopItemId: string;
  size: string;
  count: number;
};

export type CartState = {
  cartItems: Array<CartItem>;
};
