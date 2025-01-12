import { graphql, PageProps } from "gatsby";
import React, { useCallback } from "react";

import useAppDispatch from "src/app/hooks/useAppDispatch";
import cartSlice from "src/app/slices/cart/cartSlice";
import Button from "src/components/buttons/button";
import Image from "src/components/image";
import ShopNavigation from "src/components/shopNavigation";
import * as style from "src/templates/shopItemTemplate.module.css";

export type ShopItemTemplateContext = {
  shopItemId: string;
  shopImagesNameRegex: string;
};

export const query = graphql`
  query ShopItemTemplate($shopItemId: String!, $shopImagesNameRegex: String!) {
    shopItem: markdownRemark(id: { eq: $shopItemId }) {
      ...ShopItemFragment
    }
    shopImages: allFile(filter: { name: { regex: $shopImagesNameRegex } }, sort: { name: ASC }) {
      nodes {
        ...ImageFragment
      }
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
    <>
      <ShopNavigation goToShop goToCart />
      <h1>{shopItem.frontmatter?.title}</h1>
      <div className={style.item}>
        <div className={style.itemImages}>
          {props.data.shopImages.nodes.map((shopImageNode) => {
            return (
              <Image
                key={shopImageNode.id}
                className={style.itemImage}
                image={shopImageNode.childImageSharp?.gatsbyImageData}
                alt={shopItem.frontmatter?.title}
              />
            );
          })}
        </div>
        <div className={style.itemDetails}>
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
      </div>
    </>
  );
}
