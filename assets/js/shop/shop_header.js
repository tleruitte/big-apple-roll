import { loadCart, getCartCount } from "./modules/shop_common.js";

const CART_COUNT_ID = "shop_header-cart-count";

loadCart();

const cartCount = getCartCount();
const cartCountElement = document.getElementById(CART_COUNT_ID);
if (cartCount && cartCountElement) {
  cartCountElement.innerHTML = `(${cartCount})`;
}
