import { PayPalButtonCreateOrder, PayPalButtonOnApprove } from "@paypal/paypal-js";
import {
  PayPalScriptProvider,
  PayPalButtons,
  ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";
import { graphql, useStaticQuery } from "gatsby";
import React, { useCallback, useMemo } from "react";

import useAppDispatch from "src/app/hooks/useAppDispatch";
import cartSlice from "src/app/slices/cart/cartSlice";
import { CartEntryKey } from "src/app/slices/cart/types";
import TextButton from "src/components/buttons/textButton";
import useCallbackId from "src/components/hooks/useCallbackId";
import Image from "src/components/image";
import HeadLayout from "src/components/layouts/headLayout";
import ShopCounter from "src/components/shop/shopCounter";
import ShopNavigation from "src/components/shop/shopNavigation";
import useShop, { CartItem } from "src/components/shop/useShop";
import * as style from "src/pages/shop/cart.module.css";

// Doc: https://developer.paypal.com/sdk/js/configuration/
const PAYPAL_OPTIONS: ReactPayPalScriptOptions = {
  clientId: "ASkF4WrNyc3lZOXQmFSsXsFl64ggGyH5iUMoR3VVBe8TgEKA8se1RXCdZ01Ys4HqYebewTpXZIoGwhAw",
  currency: "USD",
  intent: "capture",
  components: "buttons,applepay",
  disableFunding: "paylater",
};

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

  const handleCreateOrder = useMemo((): PayPalButtonCreateOrder => {
    return async (data, actions) => {
      return actions.order.create({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: "98",
            },
          },
        ],
      });
    };
  }, []);

  const handleApproveOrder = useMemo((): PayPalButtonOnApprove => {
    return async (data, actions) => {
      await actions.order?.capture();
      alert("Transaction completed");
    };
  }, []);

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
          <div className={style.paypal}>
            <PayPalScriptProvider options={PAYPAL_OPTIONS}>
              <PayPalButtons createOrder={handleCreateOrder} onApprove={handleApproveOrder} />
            </PayPalScriptProvider>
          </div>
        </div>
      </div>
    </>
  );
}

export function Head() {
  return <HeadLayout pageTitle="" />;
}
