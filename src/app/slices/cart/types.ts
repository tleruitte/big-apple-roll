export type CartItemModel = {
  shopItemId: string;
  size: string;
  count: number;
};

export type CartState = {
  cartItems: Array<CartItemModel>;
};
