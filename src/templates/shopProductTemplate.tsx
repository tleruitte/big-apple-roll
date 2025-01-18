import { graphql, PageProps } from "gatsby";
import React, { useCallback, useMemo } from "react";

import useAppDispatch from "src/app/hooks/useAppDispatch";
import cartSlice from "src/app/slices/cart/cartSlice";
import Button, { ButtonColor } from "src/components/buttons/button";
import Image from "src/components/image";
import ShopNavigation from "src/components/shop/shopNavigation";
import useShop from "src/components/shop/useShop";
import { ShopProductColor } from "src/fragments/shop/shopProductFragment";
import isEnumValue from "src/helpers/isEnumValue";
import switchOn from "src/helpers/switchOn";
import * as style from "src/templates/shopProductTemplate.module.css";

export type ShopProductTemplateContext = {
  shopProductId: string;
  shopProductImagesNameRegex: string;
};

export const query = graphql`
  query ShopProductTemplate($shopProductId: String!, $shopProductImagesNameRegex: String!) {
    shopProducts: allMarkdownRemark(
      sort: { frontmatter: { order_index: ASC } }
      filter: { fileRelativeDirectory: { eq: "shop" } }
    ) {
      nodes {
        ...ShopProductFragment
      }
    }
    shopProductsImages: allFile(
      filter: { relativeDirectory: { eq: "shop" }, extension: { ne: "md" } }
      sort: { name: ASC }
    ) {
      nodes {
        ...ImageFragment
      }
    }
    shopProduct: markdownRemark(id: { eq: $shopProductId }) {
      ...ShopProductFragment
    }
    shopProductImages: allFile(
      filter: { name: { regex: $shopProductImagesNameRegex } }
      sort: { name: ASC }
    ) {
      nodes {
        ...ImageFragment
      }
    }
  }
`;

export default function ShopProductTemplate(
  props: PageProps<Queries.ShopProductTemplateQuery, ShopProductTemplateContext>,
): React.JSX.Element {
  const { data } = props;
  const { shopProducts, shopProductsImages, shopProduct, shopProductImages } = data;

  const dispatch = useAppDispatch();

  const { cartItemCount } = useShop(shopProducts, shopProductsImages);

  const buttonColor = useMemo((): ButtonColor | undefined => {
    if (
      shopProduct?.frontmatter?.color &&
      isEnumValue(shopProduct.frontmatter.color, ShopProductColor)
    ) {
      return switchOn(shopProduct.frontmatter.color, {
        [ShopProductColor.Orange]: "accent1",
        [ShopProductColor.Green]: "accent2",
        [ShopProductColor.Blue]: "accent3",
      });
    }
    return undefined;
  }, [shopProduct?.frontmatter?.color]);

  const handleAddToCart = useCallback(() => {
    const shopProductName = shopProduct?.fileName;
    if (!shopProductName) {
      return;
    }

    dispatch(
      cartSlice.actions.addCartEntry({
        name: shopProductName,
        size: "small",
        count: 1,
      }),
    );
  }, [dispatch, shopProduct?.fileName]);

  if (!shopProduct) {
    return <></>;
  }

  return (
    <>
      <ShopNavigation cartItemCount={cartItemCount} goToShop goToCart />
      <h1>{shopProduct.frontmatter?.title}</h1>
      <div className={style.shopProduct}>
        <div className={style.shopProductImages}>
          {shopProductImages.nodes.map((shopProductImage) => {
            return (
              <Image
                key={shopProductImage.id}
                className={style.shopProductImage}
                image={shopProductImage.childImageSharp?.gatsbyImageData}
                alt={shopProduct.frontmatter?.title}
              />
            );
          })}
        </div>
        <div className={style.shopProductDetails}>
          <div dangerouslySetInnerHTML={{ __html: shopProduct.html ?? "" }}></div>
          <div>
            <Button to="/cart/" color={buttonColor} onClick={handleAddToCart}>
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
