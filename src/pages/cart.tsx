import React, { useCallback } from "react";

import * as style from "src/pages/cart.module.css";
import HeadLayout from "src/components/layouts/headLayout";
import useAppSelector from "src/app/hooks/useAppSelector";
import useAppDispatch from "src/app/hooks/useAppDispatch";

export default function Cart(): React.JSX.Element {
  // const data = useStaticQuery<Queries.CartQuery>(graphql`
  //   query Cart {
  //   }
  // `);

  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const dispatch = useAppDispatch();

  const handleAddItem = useCallback(() => {
    // dispatch(cartSlice.actions.addItem("item"));
  }, []);

  return (
    <div className={style.cart}>
      <h1>Cart</h1>
      <div>
        {cartItems.map((cartItem) => (
          <div key={cartItem.shopItemId}>
            <div>{cartItem.shopItemId}</div>
            <div>{cartItem.size}</div>
            <div>{cartItem.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Head() {
  return <HeadLayout pageTitle="" />;
}
