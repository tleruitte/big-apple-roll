import { compact, sortBy } from "lodash";
import { useMemo } from "react";

import useAppSelector from "src/app/hooks/useAppSelector";
import selectCartEntries from "src/app/slices/cart/selectors/selectCartEntries";
import { CartEntry, CartEntryKey } from "src/app/slices/cart/types";

export type CartItem = {
  key: CartEntryKey;
  cartEntry: CartEntry;
  shopProduct: Queries.ShopQuery["allShopProducts"]["nodes"][number];
  price: number;
  undiscountedPrice: number;
};

type NullableDiscount = NonNullable<
  NonNullable<Queries.ShopQuery["allShopProducts"]["nodes"][number]["frontmatter"]>["discounts"]
>[number];

type Discount = {
  [P in keyof NonNullable<NullableDiscount>]: NonNullable<NonNullable<NullableDiscount>[P]>;
};

const getPrice = (
  count: number,
  price: number,
  nullableDiscounts: ReadonlyArray<NullableDiscount> | null,
): number => {
  const discounts = (nullableDiscounts ?? []).filter((discount): discount is Discount => {
    return !!discount?.count && !!discount.price;
  });

  if (discounts.length) {
    const orderedDiscounts = sortBy(discounts, "count");
    const discount = orderedDiscounts.findLast((discount) => count >= discount.count);
    if (discount) {
      return discount.price + getPrice(count - discount.count, price, discounts);
    }
  }

  return count * price;
};

const toFixedNumber = (number: number): number => {
  return parseFloat(number.toFixed(2));
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
          !shopProduct.frontmatter?.price ||
          (shopProduct.frontmatter?.sizes &&
            !shopProduct.frontmatter.sizes.includes(cartEntry.size))
        ) {
          return null;
        }

        return {
          key: cartEntry.key,
          cartEntry,
          shopProduct,
          price: toFixedNumber(
            getPrice(
              cartEntry.count,
              shopProduct.frontmatter.price,
              shopProduct.frontmatter.discounts,
            ),
          ),
          undiscountedPrice: toFixedNumber(
            getPrice(cartEntry.count, shopProduct.frontmatter?.price, null),
          ),
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
      return toFixedNumber(acc + cartItem.price);
    }, 0);
  }, [cartItems]);

  return {
    cartItems,
    cartItemCount,
    cartTotal,
  };
};

export default useShop;
