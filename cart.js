function getProduct() {
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
      }
    }
  }
  return products;
}

// Call getProduct to get the products from localStorage
let products = getProduct();

// Loop through the products array and display each product
products.forEach((parsedItem) => {
  displayProduct(parsedItem);
  removeProduct(parsedItem)
});

function displayProduct(parsedItem) {
  let container = document.querySelector(".product-container");

  let product_card_container = document.createElement("div");
  product_card_container.classList.add("product-card-container");

  let product_img = document.createElement("div");
  product_img.classList.add("product-img");
  let item_img = document.createElement("img");
  item_img.src = `${parsedItem.image}`;
  item_img.alt = "product";
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

function orderDetails(products) {
  let total = 0;

  products.forEach((parsedItem) => {
    total += parsedItem.price;
  });

  let container = document.querySelector(".order-details");

  let summary_container = document.createElement("div");
  summary_container.classList.add("summary-container");

  // price heading

  let price_heading = document.createElement("h1");
  price_heading.classList.add("price-heading");
  price_heading.textContent = "Order Summary";

  // sub total
  let sub_total = document.createElement("div");
  sub_total.classList.add("sub-total");
  sub_total.classList.add("justify-content");

  let sub_total_heading = document.createElement("p");
  sub_total_heading.classList.add("order-heading");
  sub_total_heading.innerHTML = "Sub-total";

  let sub_total_price = document.createElement("h3");
  sub_total_price.classList.add("sub-total-price");
  sub_total_price.innerHTML = `$${total.toFixed(2)}`;

  sub_total.appendChild(sub_total_heading);
  sub_total.appendChild(sub_total_price);

  // delivery charges
  let delivery_container = document.createElement("div");
  delivery_container.classList.add("delivery-charges");
  delivery_container.classList.add("justify-content");

  let delivery_heading = document.createElement("p");
  delivery_heading.classList.add("order-heading");
  delivery_heading.innerText = "Delivery Charges";

  let charges = document.createElement("h3");
  charges.classList.add("charges");
  charges.innerHTML = "$20";

  let chargesNumber = parseFloat(charges.innerHTML.replace(/\D/g, "")); // Extract numerical part and parse it into a number

  delivery_container.appendChild(delivery_heading);
  delivery_container.appendChild(charges);

  //total amount
  let totalCharges = 0;

  if (total < 500) {
    totalCharges += total + chargesNumber;
    charges.style.color = "";
    charges.style.textDecoration = "none";
  } else {
    totalCharges = total;
    charges.style.color = "gray";
    charges.style.textDecoration = "line-through";
  }

  if (total === 0) {
    totalCharges = 0;
    delivery_container.style.display = "none";
  }

  let total_charges_container = document.createElement("div");
  total_charges_container.classList.add("total-amount");
  total_charges_container.classList.add("justify-content");

  let total_charges_heading = document.createElement("p"); // Create a separate element for delivery heading
  total_charges_heading.classList.add("order-heading");
  total_charges_heading.innerText = "Total Amount";

  let total_charges = document.createElement("h3");
  total_charges.classList.add("total");
  total_charges.innerHTML = `$${totalCharges.toFixed(2)}`;

  total_charges_container.appendChild(total_charges_heading);
  total_charges_container.appendChild(total_charges);

  // promo code container
  let promo_code_container = document.createElement("div");
  promo_code_container.classList.add("promo-code-container");
  promo_code_container.classList.add("justify-content");

  let promo_searchBar = document.createElement("input");
  promo_searchBar.classList.add("promo-code-search");
  promo_searchBar.type = "search";
  promo_searchBar.placeholder = "Add promo code";

  let promo_btn = document.createElement("button");
  promo_btn.classList.add("promo-btn");
  promo_btn.classList.add("cart-container-btns");
  promo_btn.textContent = "Apply";

  promo_code_container.appendChild(promo_searchBar);
  promo_code_container.appendChild(promo_btn);

  //checkout container
  let checkout_container = document.createElement("div");
  checkout_container.classList.add("checkout-btn-container");

  let checkout_btn = document.createElement("button");
  checkout_btn.classList.add("checkout-btn");
  checkout_btn.classList.add("cart-container-btns");
  checkout_btn.innerHTML = `Checkout <i class="fa-solid fa-angle-right"></i>`;

  checkout_btn.addEventListener("click", () => {
    window.location.href = "checkout.html";
  });

  checkout_container.appendChild(checkout_btn);

  // append in Summary Container
  summary_container.appendChild(price_heading);
  summary_container.appendChild(sub_total);
  summary_container.appendChild(delivery_container);
  summary_container.appendChild(total_charges_container);
  summary_container.appendChild(promo_code_container);
  summary_container.appendChild(checkout_container);

  // append in main container
  container.appendChild(summary_container);
}

// Call getProduct to get the products from localStorage
let product_details = getProduct();

// Call orderDetails with the products array
orderDetails(product_details);

function updateCart() {
  let cart = document.querySelector(".cart");
  let itemCount = ''; 
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (key.startsWith("product_")) {
      itemCount++;
    }
  }
  cart.innerHTML = `<img src="assets/icons/cart.svg" alt="cart"> ${itemCount}`;
  cart.addEventListener("click", () => {
    window.location.href = "cart.html";
  });
}

updateCart();

function showWishlist(){
  let addwishlist = document.querySelector('.addwishlist')
  let wishlistProdCount = ''
  for (let i =0; i< localStorage.length; i++){
    let key= localStorage.key(i)
    if(key.startsWith('cart_')){
      wishlistProdCount++
    }
  }
  addwishlist.innerHTML = `<i class="fa-solid fa-heart"></i> ${wishlistProdCount}`
}
showWishlist()

function removeProduct(parsedItem) {
  let removeItemBtns = document.querySelectorAll(".remove-item-btn");
  let product_cards = document.querySelectorAll(".product-card-container");
  

  removeItemBtns.forEach((removeItemBtn, index) => {
    removeItemBtn.addEventListener("click", () => {
      let productId = parsedItem.id; 
      let keyToRemove = `product_${productId}`;      
      localStorage.removeItem(keyToRemove);
      product_cards[index].style.display = "none";
    });
  });
}


removeProduct();


//sidebar

function appBar() {
  const sidebar = document.querySelector(".sidebar");
  const hamburgerIcon = document.querySelector(".hamburger-icon");
  const body = document.querySelector("body");
  const closeSidebar = document.querySelector(".close-sidebar");

  hamburgerIcon.addEventListener("click", function (event) {
    event.stopPropagation();
    sidebar.classList.toggle("open");
  });

  // Close sidebar when clicking outside of it
  body.addEventListener("click", function (event) {
    if (
      !sidebar.contains(event.target) &&
      !hamburgerIcon.contains(event.target)
    ) {
      sidebar.classList.remove("open");
    }
  });

  closeSidebar.addEventListener("click", function () {
    sidebar.classList.remove("open");
  });
}

appBar();
