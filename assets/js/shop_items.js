---
layout: null
title: Shop items
---

const SHOP_ITEMS = {
  {% for shop_tshirt in site.shop_tshirts %}
  "{{ shop_tshirt.shop_id }}": {
    "id": "{{ shop_tshirt.shop_id }}",
    "price": {{ shop_tshirt.shop_price }},
    "title": "{{ shop_tshirt.title }}",
  },
  {% endfor %}
}