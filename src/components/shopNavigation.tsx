import React, { useMemo } from "react";
import * as style from "src/pages/shopNavigation.module.css";

import Pagination from "src/components/pagination";
import useAppSelector from "src/app/hooks/useAppSelector";

type Props = {
  goToShop?: boolean;
  goToCart?: boolean;
};

export default function ShopNavigation(props: Props): React.JSX.Element | null {
  const { goToShop, goToCart } = props;

  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const cartItemsCount = useMemo(() => {
    return cartItems.reduce((acc, cartItem) => {
      return acc + cartItem.count;
    }, 0);
  }, [cartItems]);

  return (
    <Pagination
      previousSlug={goToShop ? "/shop/" : undefined}
      previousTitle={goToShop ? "Shop" : undefined}
      nextSlug={goToCart ? "/cart/" : undefined}
      nextTitle={goToCart ? `Cart${cartItemsCount ? ` (${cartItemsCount})` : ""}` : undefined}
    />
  );
}
