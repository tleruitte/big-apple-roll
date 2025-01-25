import { compact } from "lodash";
import { useMemo } from "react";

import useAppSelector from "src/app/hooks/useAppSelector";
import selectCartEntries from "src/app/slices/cart/selectors/selectCartEntries";
import { CartEntry, CartEntryKey } from "src/app/slices/cart/types";

export type CartItem = {
  key: CartEntryKey;
  cartEntry: CartEntry;
  shopProduct: Queries.ShopQuery["allShopProducts"]["nodes"][number];
};

const useShop = (allShopProducts: Queries.ShopQuery["allShopProducts"]) => {
  const cartEntries = useAppSelector(selectCartEntries);

  const cartItems = useMemo(() => {
    const shopProductsByName = allShopProducts.nodes.reduce<
      Record<string, Queries.ShopQuery["allShopProducts"]["nodes"][number]>
    >((acc, shopItemNode) => {
      if (!shopItemNode.fileName) {
        return acc;
      }

      return {
        ...acc,
        [shopItemNode.fileName]: shopItemNode,
      };
    }, {});

    return compact(
      cartEntries.map((cartEntry): CartItem | null => {
        const shopProduct = shopProductsByName[cartEntry.name];
        if (
          !shopProduct ||
          (shopProduct.frontmatter?.sizes &&
            !shopProduct.frontmatter.sizes.includes(cartEntry.size))
        ) {
          return null;
        }

        return {
          key: cartEntry.key,
          cartEntry,
          shopProduct,
        };
      }),
    );
  }, [allShopProducts.nodes, cartEntries]);

  const cartItemCount = useMemo(() => {
    return cartItems.reduce((acc, cartItem) => {
      return acc + cartItem.cartEntry.count;
    }, 0);
  }, [cartItems]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((acc, cartItem) => {
      return acc + cartItem.cartEntry.count * (cartItem.shopProduct.frontmatter?.price ?? 0);
    }, 0);
  }, [cartItems]);

  return {
    cartItems,
    cartItemCount,
    cartTotal,
  };
};

export default useShop;
