function getProduct() {
  // Initialize an empty array to store products
  let products = [];

  // Iterate through each key in localStorage
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);

    // Check if the key matches the pattern 'product_'
    if (key.startsWith("product_")) {
      let item = localStorage.getItem(key);

      // Parse the item as JSON and push it to the products array
      let parsedItem = JSON.parse(item);
      if (parsedItem !== null && typeof parsedItem === "object") {
        products.push(parsedItem);

        let container = document.querySelector(".product-container");

        let product_card_container = document.createElement("div");
        product_card_container.classList.add("product-card-container");

        let product_img = document.createElement("div");
        product_img.classList.add("product-img");
        let item_img = document.createElement("img");
        item_img.src = `${parsedItem.image}`;
        product_img.appendChild(item_img);

        let product_info = document.createElement("div");
        product_info.classList.add("product-info");

        let product_title = document.createElement("h1");
        product_title.classList.add("product-title");
        product_title.innerHTML = `${parsedItem.title}`;

        let product_price = document.createElement("p");
        product_price.classList.add("product-price");
        product_price.innerHTML = `$${parsedItem.price}`;

        let exp_price = document.createElement("span");
        exp_price.classList.add("exp_price");
        let result = (parsedItem.price * 2.3).toFixed(1);
        exp_price.innerHTML = `$${result}`;

        product_price.appendChild(exp_price);

        let remove_btn = document.createElement("button");
        remove_btn.classList.add("remove-item-btn");
        remove_btn.classList.add("cart-container-btns");
        remove_btn.innerHTML = `<i class="fa-solid fa-trash"></i> Remove Item`;

        product_info.appendChild(product_title);
        product_info.appendChild(product_price);
        product_info.appendChild(remove_btn);

        // append in product cards
        product_card_container.appendChild(product_img);
        product_card_container.appendChild(product_info);

        container.appendChild(product_card_container);
      }
    }
  }

  console.log(products);
}

getProduct();
