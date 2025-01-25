import clsx from "clsx";
import { graphql, PageProps } from "gatsby";
import React, { useCallback, useMemo, useState } from "react";

import useAppDispatch from "src/app/hooks/useAppDispatch";
import cartSlice from "src/app/slices/cart/cartSlice";
import LinkButton from "src/components/buttons/linkButton";
import SurfaceButton, { SurfaceButtonColor } from "src/components/buttons/surfaceButton";
import useCallbackId from "src/components/hooks/useCallbackId";
import Image from "src/components/image";
import HeadLayout from "src/components/layouts/headLayout";
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

  const [size, setSize] = useState<string | null>(null);

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

  const handleSelectSize = useCallbackId(setSize);

  const handleAddToCart = useCallback(() => {
    const shopProductName = shopProduct?.fileName;
    if (!shopProductName || !size) {
      return;
    }

    dispatch(
      cartSlice.actions.addCartEntry({
        name: shopProductName,
        size,
        count: 1,
      }),
    );
  }, [dispatch, shopProduct?.fileName, size]);

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
            <div className={style.sizeLabel}>Size:</div>
            <div className={style.sizes}>
              {shopProduct.frontmatter?.sizes?.map((shopProductSize) => {
                return (
                  <button
                    key={shopProductSize}
                    className={clsx(style.size, {
                      [style.isSelected]: size === shopProductSize,
                    })}
                    data-id={shopProductSize}
                    onClick={handleSelectSize}
                  >
                    {shopProductSize}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <SurfaceButton
              internalHref="/shop/cart/"
              color={buttonColor}
              disabled={!size}
              onClick={handleAddToCart}
            >
              Add to cart
            </SurfaceButton>
          </div>
          <div>
            T-shirts must be picked-up during registration on{" "}
            <LinkButton to="/schedule/friday/registration-and-expo/">Friday</LinkButton> or{" "}
            <LinkButton internalHref="/schedule/saturday/registration-and-expo/">
              Saturday
            </LinkButton>
            .
          </div>
        </div>
      </div>
    </>
  );
}

export function Head(
  props: PageProps<Queries.ShopProductTemplateQuery, ShopProductTemplateContext>,
): React.JSX.Element {
  const { data } = props;
  const { shopProduct } = data;
  return <HeadLayout pageTitle={shopProduct?.frontmatter?.title} />;
}
