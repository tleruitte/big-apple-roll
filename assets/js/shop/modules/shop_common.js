import { SHOP_ITEMS } from "./shop_items.js";

let cartCountByShopId = {};
let isCartLoaded = false;

export const loadCart = () => {
  if (isCartLoaded) {
    return;
  }

  // Load cart from local storage
  if (typeof Storage !== "undefined" && localStorage.cart) {
    cartCountByShopId = JSON.parse(localStorage.cart);
  }

  // Add item to cart from url hash
  if (window.location.hash) {
    var shopId = window.location.hash.substring(1);
    if (SHOP_ITEMS[shopId]) {
      incrementItem(shopId);
    }
    window.location.hash = "";
  }

  isCartLoaded = true;
};

const saveCart = () => {
  localStorage.cart = JSON.stringify(cartCountByShopId);
};

export const getCartCount = () => {
  return Object.values(cartCountByShopId).reduce((acc, value) => {
    return acc + value;
  }, 0);
};

export const getCart = () => {
  return Object.entries(cartCountByShopId).map(([shopId, cartCount]) => {
    return {
      shopId,
      name: SHOP_ITEMS[shopId].title,
      quantity: cartCount,
      price: SHOP_ITEMS[shopId].price.toFixed(2),
      subtotal: parseFloat(
        cartCountByShopId[shopId] * SHOP_ITEMS[shopId].price
      ).toFixed(2),
    };
  });
};

export const incrementItem = (shopId) => {
  if (!cartCountByShopId[shopId]) {
    cartCountByShopId[shopId] = 1;
  } else {
    cartCountByShopId[shopId]++;
  }

  saveCart();
};

export const decrementItem = (shopId) => {
  if (cartCountByShopId[shopId]) {
    if (cartCountByShopId[shopId] == 1) {
      removeItem(shopId);
    } else {
      cartCountByShopId[shopId]--;

      saveCart();
    }
  }
};

export const removeItem = (shopId) => {
  delete cartCountByShopId[shopId];
  saveCart();
};

export const clearCart = () => {
  cartCountByShopId = {};
  saveCart();
};
