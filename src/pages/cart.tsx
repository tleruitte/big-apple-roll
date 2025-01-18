import React, { useCallback } from "react";
import { graphql, useStaticQuery } from "gatsby";

import * as style from "src/pages/cart.module.css";
import HeadLayout from "src/components/layouts/headLayout";
import useAppDispatch from "src/app/hooks/useAppDispatch";
import ShopNavigation from "src/components/shopNavigation";
import useCartItems from "src/components/shop/useCartItems";
import Image from "src/components/image";
import TextButton from "src/components/buttons/textButton";

export default function Cart(): React.JSX.Element {
  const { shopItems, shopImages } = useStaticQuery<Queries.CartQuery>(graphql`
    query Cart {
      shopItems: allMarkdownRemark(
        sort: { frontmatter: { order_index: ASC } }
        filter: { fileRelativeDirectory: { eq: "shop" } }
      ) {
        nodes {
          ...ShopItemFragment
        }
      }
      shopImages: allFile(
        filter: { relativeDirectory: { eq: "shop" }, extension: { ne: "md" } }
        sort: { name: ASC }
      ) {
        nodes {
          ...ImageFragment
        }
      }
    }
  `);

  const dispatch = useAppDispatch();

  const { cartItems } = useCartItems(shopItems, shopImages);

  const handleAddItem = useCallback(() => {
    // dispatch(cartSlice.actions.addItem("item"));
  }, []);

  return (
    <>
      <ShopNavigation goToShop />
      <h1>Cart</h1>
      <div className={style.cart}>
        <div className={style.cartItems}>
          {cartItems.map((cartItem) => (
            <React.Fragment key={cartItem.shopItem.id}>
              <Image
                className={style.cartItemImage}
                image={cartItem.shopImages[0].childImageSharp?.gatsbyImageData}
                alt={cartItem.shopItem.frontmatter?.title}
              />
              <div>
                <div>
                  <strong>{cartItem.shopItem.frontmatter?.title}</strong>
                </div>
                <div>{cartItem.cartItemModel.size}</div>
                <div>${cartItem.shopItem.frontmatter?.price}</div>
                <div>- {cartItem.cartItemModel.count} +</div>
              </div>
              <div>
                <TextButton>Remove</TextButton>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}

export function Head() {
  return <HeadLayout pageTitle="" />;
}
