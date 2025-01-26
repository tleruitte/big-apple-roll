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
import * as classNames from "src/pages/shop/cart.module.css";

// Doc: https://developer.paypal.com/sdk/js/configuration/
const PAYPAL_OPTIONS: ReactPayPalScriptOptions = {
  clientId: "ASkF4WrNyc3lZOXQmFSsXsFl64ggGyH5iUMoR3VVBe8TgEKA8se1RXCdZ01Ys4HqYebewTpXZIoGwhAw",
  currency: "USD",
  intent: "capture",
  components: "buttons,applepay",
  disableFunding: "paylater",
};

export default function Cart(): React.JSX.Element {
  const { allShopProducts } = useStaticQuery<Queries.CartQuery>(graphql`
    query Cart {
      allShopProducts: allMarkdownRemark(
        sort: { frontmatter: { order_index: ASC } }
        filter: { fileRelativeDirectory: { eq: "shop" } }
      ) {
        nodes {
          ...ShopProductFragment
        }
      }
    }
  `);

  const dispatch = useAppDispatch();

  const { cartItems, cartItemCount, cartTotal } = useShop(allShopProducts);

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
      <div className={classNames.cart}>
        <div className={classNames.cartItems}>
          {cartItems.map((cartItem) => {
            const hasDiscount =
              cartItem.undiscountedPrice && cartItem.undiscountedPrice !== cartItem.price;
            return (
              <React.Fragment key={cartItem.key}>
                <div>
                  <Image
                    className={classNames.cartItemImage}
                    image={cartItem.shopProduct.linkedFiles[0]?.childImageSharp?.gatsbyImageData}
                    alt={cartItem.shopProduct.frontmatter?.title}
                  />
                </div>
                <div className={classNames.cartItemDetails}>
                  <div>
                    <strong>{cartItem.shopProduct.frontmatter?.title}</strong> - $
                    {cartItem.shopProduct.frontmatter?.price}
                  </div>
                  {cartItem.cartEntry.size ? <div>{cartItem.cartEntry.size}</div> : null}
                  <div>
                    {hasDiscount ? (
                      <s className={classNames.discount}>${cartItem.undiscountedPrice}</s>
                    ) : null}{" "}
                    <span>${cartItem.price}</span>
                  </div>
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
            );
          })}
        </div>
        <div>
          <h2 className={classNames.summary}>Order summary</h2>
          <div className={classNames.total}>
            <span>Total</span>
            <span>${cartTotal}</span>
          </div>
          <div className={classNames.paypal}>
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
  return <HeadLayout pageTitle="Cart" />;
}
