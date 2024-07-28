const CART_CONTENT_ID = "cart-content";
const CART_PAYPAL_ID = "cart-paypal";
const CART_MESSAGE_SUCCESS_SELECTOR = ".cart-message--success";
const CART_MESSAGE_ERROR_SELECTOR = ".cart-message--error";

let cart = {};

const loadCart = () => {
  // Load cart from local storage
  if (typeof Storage !== "undefined" && localStorage.cart) {
    cart = JSON.parse(localStorage.cart);
    renderCart();
  }

  // Add item to cart from url hash
  if (window.location.hash) {
    var shopId = window.location.hash.substring(1);
    if (SHOP_ITEMS[shopId]) {
      incrementItem(shopId);
    }
    window.location.hash = "";
  }
};

const incrementItem = (shopId) => {
  if (!cart[shopId]) {
    cart[shopId] = 1;
  } else {
    cart[shopId]++;
  }

  localStorage.cart = JSON.stringify(cart);
  renderCart();
};

const decrementItem = (shopId) => {
  if (cart[shopId]) {
    if (cart[shopId] == 1) {
      removeItem(shopId);
    } else {
      cart[shopId]--;

      localStorage.cart = JSON.stringify(cart);
      renderCart();
    }
  }
};

const removeItem = (shopId) => {
  delete cart[shopId];

  localStorage.cart = JSON.stringify(cart);
  renderCart();
};

const mapCart = () => {
  return Object.keys(cart).map((shopId) => {
    return {
      shopId,
      name: SHOP_ITEMS[shopId].title,
      quantity: cart[shopId],
      price: SHOP_ITEMS[shopId].price.toFixed(2),
      subtotal: parseFloat(cart[shopId] * SHOP_ITEMS[shopId].price).toFixed(2),
    };
  });
};

const getCartContent = () => {
  if (Object.keys(cart).length == 0) {
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

  mapCart().forEach(({ shopId, name, quantity, subtotal }) => {
    total += parseFloat(subtotal);

    html += `
      <tr>
        <td>${name}</td>
        <td>
          ${quantity}
          <button onclick="incrementItem('${shopId}')">+</button>
          <button onclick="decrementItem('${shopId}')">-</button>
          <button onclick="removeItem('${shopId}')">🗑</button>
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
            items: mapCart().map(({ name, quantity, price }) => {
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

        renderMessage(true);

        cart = {};

        localStorage.cart = JSON.stringify(cart);
        renderCart();
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
