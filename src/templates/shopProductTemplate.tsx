import { graphql, PageProps } from "gatsby";
import React, { useCallback, useMemo } from "react";

import useAppDispatch from "src/app/hooks/useAppDispatch";
import cartSlice from "src/app/slices/cart/cartSlice";
import SurfaceButton, { SurfaceButtonColor } from "src/components/buttons/surfaceButton";
import Image from "src/components/image";
import ShopNavigation from "src/components/shop/shopNavigation";
import useShop from "src/components/shop/useShop";
import { ShopProductButtonColor } from "src/fragments/shop/shopProductFragment";
import isEnumValue from "src/helpers/isEnumValue";
import switchOn from "src/helpers/switchOn";
import * as style from "src/templates/shopProductTemplate.module.css";

export type ShopProductTemplateContext = {
  shopProductId: string;
};

export const query = graphql`
  query ShopProductTemplate($shopProductId: String!) {
    allShopProducts: allMarkdownRemark(
      sort: { frontmatter: { order_index: ASC } }
      filter: { fileRelativeDirectory: { eq: "shop" } }
    ) {
      nodes {
        ...ShopProductFragment
      }
    }
    shopProduct: markdownRemark(id: { eq: $shopProductId }) {
      ...ShopProductFragment
    }
  }
`;

export default function ShopProductTemplate(
  props: PageProps<Queries.ShopProductTemplateQuery, ShopProductTemplateContext>,
): React.JSX.Element {
  const { data } = props;
  const { allShopProducts, shopProduct } = data;

  const dispatch = useAppDispatch();

  const { cartItemCount } = useShop(allShopProducts);

  const buttonColor = useMemo((): SurfaceButtonColor | undefined => {
    if (
      shopProduct?.frontmatter?.button_color &&
      isEnumValue(shopProduct.frontmatter.button_color, ShopProductButtonColor)
    ) {
      return switchOn(shopProduct.frontmatter.button_color, {
        [ShopProductButtonColor.Orange]: "accent1",
        [ShopProductButtonColor.Green]: "accent2",
        [ShopProductButtonColor.Blue]: "accent3",
      });
    }
    return undefined;
  }, [shopProduct?.frontmatter?.button_color]);

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
          {shopProduct.linkedFiles.map((shopProductLinkedFile) => {
            return (
              <Image
                key={shopProductLinkedFile.id}
                className={style.shopProductImage}
                image={shopProductLinkedFile.childImageSharp?.gatsbyImageData}
                alt={shopProduct.frontmatter?.title}
              />
            );
          })}
        </div>
        <div className={style.shopProductDetails}>
          <div dangerouslySetInnerHTML={{ __html: shopProduct.html ?? "" }}></div>
          <div>
            <SurfaceButton internalHref="/shop/cart/" color={buttonColor} onClick={handleAddToCart}>
              Add to cart
            </SurfaceButton>
          </div>
          <div>
            <p>T-shirts must be picked-up during registration on Friday or Saturday.</p>
          </div>
        </div>
      </div>
    </>
  );
}
