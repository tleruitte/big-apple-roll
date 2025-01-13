import { compact } from "lodash";

import useAppSelector from "src/app/hooks/useAppSelector";
import { CartItemModel } from "src/app/slices/cart/types";
import useShopItems from "src/components/shop/useShopItems";

type CartItem = {
  shopItem:
    | Queries.ShopQuery["shopItems"]["nodes"][number]
    | Queries.CartQuery["shopItems"]["nodes"][number];
  shopImages: Queries.ShopQuery["shopImages"]["nodes"] | Queries.CartQuery["shopImages"]["nodes"];
  cartItemModel: CartItemModel;
};

const useCartItems = (
  shopItems: Queries.ShopQuery["shopItems"] | Queries.CartQuery["shopItems"],
  shopImages: Queries.ShopQuery["shopImages"] | Queries.CartQuery["shopImages"],
) => {
  const cartItemModels = useAppSelector((state) => state.cart.cartItems);

  const { shopItemsByName, shopImagesByName } = useShopItems(shopItems, shopImages);

  const cartItems = compact(
    cartItemModels.map((cartItemModel): CartItem | null => {
      const shopItem = shopItemsByName[cartItemModel.shopItemId];
      if (!shopItem) {
        return null;
      }

      const shopImages = shopImagesByName[cartItemModel.shopItemId];
      if (!shopImages) {
        return null;
      }

      return {
        shopItem,
        shopImages,
        cartItemModel,
      };
    }),
  );

  return { cartItems };
};

export default useCartItems;
