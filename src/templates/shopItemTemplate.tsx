import { graphql, PageProps } from "gatsby";
import React, { useCallback } from "react";

import useAppDispatch from "src/app/hooks/useAppDispatch";
import cartSlice from "src/app/slices/cart/cartSlice";
import Button from "src/components/buttons/button";
import * as style from "src/templates/shopItemTemplate.module.css";

export type ShopItemTemplateContext = {
  shopItemId: string;
};

export const query = graphql`
  query ShopItemTemplate($shopItemId: String!) {
    shopItem: markdownRemark(id: { eq: $shopItemId }) {
      ...ShopItemFragment
    }
  }
`;

export default function ShopItemTemplate(
  props: PageProps<Queries.ShopItemTemplateQuery, ShopItemTemplateContext>,
): React.JSX.Element {
  const { data } = props;
  const { shopItem } = data;

  const dispatch = useAppDispatch();

  const handleAddToCart = useCallback(() => {
    const shopItemId = shopItem?.fileName;
    if (!shopItemId) {
      return;
    }

    dispatch(cartSlice.actions.incrementCartItem({ shopItemId, size: "small" }));
  }, [dispatch, shopItem?.fileName]);

  if (!shopItem) {
    return <></>;
  }

  return (
    <div className={style.shopItemTemplate}>
      <h1>{shopItem.frontmatter?.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: shopItem.html ?? "" }}></div>
      <div>
        <Button to="/cart/" onClick={handleAddToCart}>
          Add to cart
        </Button>
      </div>
      <div>
        <p>T-shirts must be picked-up during registration on Friday or Saturday.</p>
      </div>
    </div>
  );
}
