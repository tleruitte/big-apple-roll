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

function renderCart() {
  let html = "";

  if (Object.keys(cart).length == 0) {
    html = "<h2>Cart is empty</h2>";
  } else {
    html = `
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
    for (const item in cart) {
      const price = parseFloat(cart[item] * SHOP_ITEMS[item].price).toFixed(2);
      total += parseFloat(price);

      html += `
      <tr>
        <td>${SHOP_ITEMS[item].title}</td>
        <td>
          ${cart[item]}
          <button onclick="incrementItem('${item}')">+</button>
          <button onclick="decrementItem('${item}')">-</button>
          <button onclick="removeItem('${item}')">🗑</button>
        </td>
        <td>$${price}</td>
      </tr>
      `;
    }

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
  }

  document.getElementById("cartcontent").innerHTML = html;
}

loadCart();
