import { useMemo } from "react";

const useShopItems = (
  shopItems: Queries.ShopQuery["shopItems"] | Queries.CartQuery["shopItems"],
  shopImages: Queries.ShopQuery["shopImages"] | Queries.CartQuery["shopImages"],
) => {
  return useMemo(() => {
    const shopItemsByName = shopItems.nodes.reduce<
      Record<string, Queries.ShopQuery["shopItems"]["nodes"][number]>
    >((acc, shopItemNode) => {
      if (!shopItemNode.fileName) {
        return acc;
      }

      return {
        ...acc,
        [shopItemNode.fileName]: shopItemNode,
      };
    }, {});

    const shopImagesByName = shopItems.nodes.reduce<
      Record<string, Queries.ShopQuery["shopImages"]["nodes"]>
    >((acc, shopItemNode) => {
      const { fileName } = shopItemNode;
      if (!fileName) {
        return acc;
      }

      return {
        ...acc,
        [fileName]: shopImages.nodes.filter((shopImageNode) => {
          return shopImageNode.name.startsWith(fileName);
        }),
      };
    }, {});

    return { shopItemsByName, shopImagesByName };
  }, [shopImages.nodes, shopItems.nodes]);
};

export default useShopItems;
