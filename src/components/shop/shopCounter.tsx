import React, { useCallback } from "react";

import * as classNames from "src/components/shop/shopCounter.module.css";
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
    <div className={classNames.counter}>
      <button
        className={classNames.counterDecrement}
        disabled={cartItem.cartEntry.count <= 1}
        onClick={handleDecrement}
      >
        -
      </button>
      <div className={classNames.count}>{cartItem.cartEntry.count}</div>
      <button className={classNames.counterIncrement} onClick={handleIncrement}>
        +
      </button>
    </div>
  );
}
