import React, { useCallback } from "react";
import { graphql, useStaticQuery } from "gatsby";

import * as style from "src/pages/cart.module.css";
import HeadLayout from "src/components/layouts/headLayout";
import useAppDispatch from "src/app/hooks/useAppDispatch";
import ShopNavigation from "src/components/shop/shopNavigation";
import Image from "src/components/image";
import TextButton from "src/components/buttons/textButton";
import cartSlice from "src/app/slices/cart/cartSlice";
import useCallbackId from "src/components/hooks/useCallbackId";
import { CartEntryKey } from "src/app/slices/cart/types";
import useShop, { CartItem } from "src/components/shop/useShop";
import ShopCounter from "src/components/shop/shopCounter";

export default function Cart(): React.JSX.Element {
  const { shopProducts, shopProductsImages } = useStaticQuery<Queries.CartQuery>(graphql`
    query Cart {
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
    }
  `);

  const dispatch = useAppDispatch();

  const { cartItems, cartItemCount, cartTotal } = useShop(shopProducts, shopProductsImages);

  const handleIncrementCartItem = useCallback(
    (cartItem: CartItem) => {
      dispatch(cartSlice.actions.incrementCartEntry(cartItem.key));
    },
    [dispatch],
  );

  const handleDecrementCartItem = useCallback(
    (cartItem: CartItem) => {
      dispatch(cartSlice.actions.decrementCartEntry(cartItem.key));
    },
    [dispatch],
  );

  const handleRemoveCartItem = useCallbackId(
    useCallback(
      (id) => {
        dispatch(cartSlice.actions.removeCartEntry(id as CartEntryKey));
      },
      [dispatch],
    ),
  );

  return (
    <>
      <ShopNavigation cartItemCount={cartItemCount} goToShop />
      <h1>Cart</h1>
      <div className={style.cart}>
        <div className={style.cartItems}>
          {cartItems.map((cartItem) => (
            <React.Fragment key={cartItem.key}>
              <div>
                <Image
                  className={style.cartItemImage}
                  image={cartItem.shopProductImages[0].childImageSharp?.gatsbyImageData}
                  alt={cartItem.shopProduct.frontmatter?.title}
                />
              </div>
              <div className={style.cartItemDetails}>
                <div>
                  <strong>{cartItem.shopProduct.frontmatter?.title}</strong>
                </div>
                <div>{cartItem.cartEntry.size}</div>
                <div>${cartItem.shopProduct.frontmatter?.price}</div>
                <div>
                  <ShopCounter
                    cartItem={cartItem}
                    onIncrement={handleIncrementCartItem}
                    onDecrement={handleDecrementCartItem}
                  ></ShopCounter>
                </div>
              </div>
              <div>
                <TextButton id={cartItem.key} onClick={handleRemoveCartItem}>
                  Remove
                </TextButton>
              </div>
            </React.Fragment>
          ))}
        </div>
        <div>
          <h2 className={style.summary}>Order summary</h2>
          <div className={style.total}>
            <span>Total</span>
            <span>${cartTotal}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export function Head() {
  return <HeadLayout pageTitle="" />;
}
