import React, { useCallback } from "react";

import * as style from "src/components/shop/shopCounter.module.css";
import { CartItem } from "src/components/shop/useShop";

type Props = {
  cartItem: CartItem;
  onIncrement?: (cartItem: CartItem) => void;
  onDecrement?: (cartItem: CartItem) => void;
};

export default function ShopCounter(props: Props): React.JSX.Element | null {
  const { cartItem, onIncrement, onDecrement } = props;

  const handleIncrement = useCallback(() => {
    onIncrement?.(cartItem);
  }, [cartItem, onIncrement]);

  const handleDecrement = useCallback(() => {
    onDecrement?.(cartItem);
  }, [cartItem, onDecrement]);

  return (
    <div className={style.counter}>
      <button
        className={style.counterDecrement}
        disabled={cartItem.cartEntry.count <= 1}
        onClick={handleDecrement}
      >
        -
      </button>
      <div className={style.count}>{cartItem.cartEntry.count}</div>
      <button className={style.counterIncrement} onClick={handleIncrement}>
        +
      </button>
    </div>
  );
}
