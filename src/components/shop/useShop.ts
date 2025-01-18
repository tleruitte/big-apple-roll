import { compact, keyBy } from "lodash";
import { useMemo } from "react";

import useAppSelector from "src/app/hooks/useAppSelector";
import selectCartEntries from "src/app/slices/cart/selectors/selectCartEntries";
import { CartEntry, CartEntryKey } from "src/app/slices/cart/types";

export type CartItem = {
  key: CartEntryKey;
  cartEntry: CartEntry;
  shopProduct:
    | Queries.ShopQuery["shopProducts"]["nodes"][number]
    | Queries.CartQuery["shopProducts"]["nodes"][number];
  shopProductImages:
    | Queries.ShopQuery["shopProductsImages"]["nodes"]
    | Queries.CartQuery["shopProductsImages"]["nodes"];
};

const useShop = (
  shopProducts: Queries.ShopQuery["shopProducts"] | Queries.CartQuery["shopProducts"],
  shopProductsImages:
    | Queries.ShopQuery["shopProductsImages"]
    | Queries.CartQuery["shopProductsImages"],
) => {
  const cartEntries = useAppSelector(selectCartEntries);

  const shopProductsByName = useMemo(() => {
    return shopProducts.nodes.reduce<
      Record<string, Queries.ShopQuery["shopProducts"]["nodes"][number]>
    >((acc, shopItemNode) => {
      if (!shopItemNode.fileName) {
        return acc;
      }

      return {
        ...acc,
        [shopItemNode.fileName]: shopItemNode,
      };
    }, {});
  }, [shopProducts.nodes]);

  const shopProductImagesByName = useMemo(() => {
    return shopProducts.nodes.reduce<
      Record<string, Queries.ShopQuery["shopProductsImages"]["nodes"]>
    >((acc, shopItemNode) => {
      const { fileName } = shopItemNode;
      if (!fileName) {
        return acc;
      }

      return {
        ...acc,
        [fileName]: shopProductsImages.nodes.filter((shopImageNode) => {
          return shopImageNode.name.startsWith(fileName);
        }),
      };
    }, {});
  }, [shopProductsImages.nodes, shopProducts.nodes]);

  const cartItems = useMemo(() => {
    return compact(
      cartEntries.map((cartEntry): CartItem | null => {
        const shopProduct = shopProductsByName[cartEntry.name];
        if (!shopProduct) {
          return null;
        }

        const shopProductImages = shopProductImagesByName[cartEntry.name];
        if (!shopProductImages) {
          return null;
        }

        return {
          key: cartEntry.key,
          cartEntry,
          shopProduct,
          shopProductImages,
        };
      }),
    );
  }, [cartEntries, shopProductImagesByName, shopProductsByName]);

  const cartItemsByKey = useMemo((): Partial<Record<CartEntryKey, CartItem>> => {
    return keyBy(cartItems, (cartItem) => cartItem.key);
  }, [cartItems]);

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
    cartItemsByKey,
    cartItemCount,
    cartTotal,
    shopProductsByName,
    shopProductImagesByName,
  };
};

export default useShop;
