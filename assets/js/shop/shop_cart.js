import {
  loadCart,
  getCartCount,
  getCart,
  incrementItem,
  decrementItem,
  removeItem,
  clearCart,
} from "./modules/shop_common.js";

const CART_CONTENT_ID = "cart-content";
const CART_PAYPAL_ID = "cart-paypal";
const CART_MESSAGE_SUCCESS_SELECTOR = ".cart-message--success";
const CART_MESSAGE_ERROR_SELECTOR = ".cart-message--error";

window.handleIncrementItem = (shopId) => {
  incrementItem(shopId);
  renderCart();
};

window.handleDecrementItem = (shopId) => {
  decrementItem(shopId);
  renderCart();
};

window.handleRemoveItem = (shopId) => {
  removeItem(shopId);
  renderCart();
};

const getCartContent = () => {
  if (getCartCount() == 0) {
    return {
      html: "<h2>Cart is empty</h2>",
      total: 0,
    };
  }

  let html = `
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
    `;

  let total = 0;

  getCart().forEach(({ shopId, name, quantity, subtotal }) => {
    total += parseFloat(subtotal);

    html += `
      <tr>
        <td>${name}</td>
        <td>
          ${quantity}
          <button onclick="handleIncrementItem('${shopId}')">+</button>
          <button onclick="handleDecrementItem('${shopId}')">-</button>
          <button onclick="handleRemoveItem('${shopId}')">🗑</button>
        </td>
        <td>$${subtotal}</td>
      </tr>
      `;
  });

  html += `
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2">Total</td>
          <td>$${total.toFixed(2)}</td>
        </tr>
      </tfoot>
    </table>
    `;

  return {
    html,
    total,
  };
};

const renderCart = () => {
  const { html, total } = getCartContent();

  document.getElementById(CART_CONTENT_ID).innerHTML = html;
  renderPaypal(total);
};

const renderPaypal = (total) => {
  document.getElementById(CART_PAYPAL_ID).innerHTML = "";

  if (!total) {
    return;
  }

  paypal
    .Buttons({
      style: {
        tagline: false,
      },
      createOrder: function (data, actions) {
        const purchase_units = [
          {
            items: getCart().map(({ name, quantity, price }) => {
              return {
                name: name,
                quantity: quantity,
                unit_amount: {
                  currency_code: "USD",
                  value: price,
                },
              };
            }),
            amount: {
              currency_code: "USD",
              value: total,
              breakdown: {
                item_total: {
                  currency_code: "USD",
                  value: total,
                },
              },
            },
          },
        ];

        return actions.order.create({
          purchase_units,
        });
      },
      async onApprove(data, actions) {
        await actions.order.capture();

        clearCart();
        renderCart();
        renderMessage(true);
      },
      onError(error) {
        renderMessage(false);
      },
    })
    .render(`#${CART_PAYPAL_ID}`);
};

const renderMessage = (success) => {
  document.querySelector(CART_MESSAGE_SUCCESS_SELECTOR).style.display = success
    ? "block"
    : "none";
  document.querySelector(CART_MESSAGE_ERROR_SELECTOR).style.display = !success
    ? "block"
    : "none";
};

loadCart();
renderCart();
