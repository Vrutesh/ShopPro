function getProduct() {
  let products = [];

  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (key.startsWith("cart_")) {
      let item = localStorage.getItem(key);
      let parsedItem = JSON.parse(item);
      if (parsedItem !== null && typeof parsedItem === "object") {
        products.push(parsedItem);
      }
    }
  }
  return products;
}

let products = getProduct();

products.forEach((parsedItem) => {
  displayProduct(parsedItem);
});

function displayProduct(product) {
  if (!product) {
    return false;
  }
    let container = document.querySelector(".product-container");

    let product_card_container = document.createElement("div");
    product_card_container.classList.add("card-container");

    let prod_category = document.createElement("span");
    prod_category.classList.add("product-category");
    prod_category.innerHTML = product.category;

    let product_img = document.createElement("div");
    product_img.classList.add("product-img");
    let item_img = document.createElement("img");
    item_img.src = `${product.image}`;
    item_img.alt = "product";
    product_img.appendChild(item_img);

    let product_info = document.createElement("div");
    product_info.classList.add("product-info");

    let product_title = document.createElement("h1");
    product_title.classList.add("product-title");
    product_title.innerHTML = `${product.title}`;

    let product_price = document.createElement("p");
    product_price.classList.add("product-price");
    product_price.innerHTML = `$${product.price}`;

    let exp_price = document.createElement("span");
    exp_price.classList.add("exp_price");
    let result = (product.price * 2.3).toFixed(1);
    exp_price.innerHTML = `$${result}`;

    let cart_btn = document.createElement("div");
    cart_btn.classList.add("cart-btn-container");

    // addtocart button

    let addtocart = document.createElement("button");
    addtocart.classList.add("add-to-cart-btn");
    addtocart.textContent = "Add to Cart";

    cart_btn.appendChild(addtocart);

    product_price.appendChild(exp_price);
    product_info.appendChild(product_title);
    product_info.appendChild(product_price);
    product_info.appendChild(cart_btn);

    // append in product cards
    product_card_container.appendChild(prod_category);
    product_card_container.appendChild(product_img);
    product_card_container.appendChild(product_info);

    container.appendChild(product_card_container);
}
