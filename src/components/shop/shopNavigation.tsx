import React from "react";

import Navigation from "src/components/navigation";

type Props = {
  cartItemCount: number;
  goToShop?: boolean;
  goToCart?: boolean;
};

export default function ShopNavigation(props: Props): React.JSX.Element | null {
  const { cartItemCount, goToShop, goToCart } = props;

  return (
    <Navigation
      previousSlug={goToShop ? "/shop/" : undefined}
      previousTitle={goToShop ? "Shop" : undefined}
      nextSlug={goToCart ? "/shop/cart/" : undefined}
      nextTitle={goToCart ? `Cart${cartItemCount ? ` (${cartItemCount})` : ""}` : undefined}
    />
  );
}
