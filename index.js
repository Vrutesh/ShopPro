fetch("https://fakestoreapi.com/products")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((product) => {
    displayProduct(product);
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });

// display products------------------------

function displayProduct(product) {
  if (!product) {
    return false;
  }
  let product_container = document.getElementById("product-container");
  product_container.innerHTML = "";

  product.forEach((product) => {
    let card = document.createElement("div");
    card.classList.add("card");

    let categoryContainer = document.createElement('div')
    categoryContainer.classList.add('category-container')

    let prod_category = document.createElement("span");
    prod_category.classList.add("product-category");
    prod_category.innerHTML = product.category;

    categoryContainer.appendChild(prod_category)
    categoryContainer.appendChild(addtowishlist(product, product.id));


    let product_img = document.createElement("img");
    product_img.classList.add("product-img");
    product_img.alt = "product";
    product_img.src = product.image;

    let product_details = document.createElement("div");
    product_details.classList.add("product-details");

    let product_title = document.createElement("h1");
    product_title.classList.add("product-title");
    product_title.innerText = product.title;

    let product_rating = document.createElement("h3");
    product_rating.classList.add("product-rating");

    // adding stars in ratings

    let fullStars = Math.floor(product.rating.rate);
    for (let i = 0; i < fullStars; i++) {
      product_rating.innerHTML += `<i class="fa-solid fa-star" style="color: rgb(255, 183, 0);"></i>`; // Append yellow star icons to the product_rating element
    }

    // Append partially filled star if there is any fractional part
    let fractionalPart = product.rating.rate - fullStars;
    if (fractionalPart > 0) {
      product_rating.innerHTML += `<i class="fa-solid fa-star" style="color: rgb(255, 183, 0); width: ${
        fractionalPart * 20
      }px; overflow: hidden; margin-right:10px;"></i>`; // Append partially filled star to the product_rating element
    }

    // Append the rating value after the stars
    product_rating.innerHTML += `${product.rating.rate}/${product.rating.count}`;

    // Now you can append the product_rating element to your desired location in the DOM

    let product_price = document.createElement("h3");
    product_price.classList.add("product-price");
    product_price.innerHTML = `Price : $${product.price}/-`;

    let exp_price = document.createElement("h3");
    let formattedPrice = (product.price * 2.3).toFixed(1);
    exp_price.innerHTML = `$${formattedPrice}`;
    exp_price.style.textDecoration = "line-through";
    exp_price.style.color = "gray";
    exp_price.style.fontSize = "0.9rem";

    product_price.appendChild(exp_price);

    let cart_btn = document.createElement("div");
    cart_btn.classList.add("cart-btn-container");

    // addtocart button

    let addtocart = document.createElement("button");
    addtocart.classList.add("add-to-cart-btn");
    addtocart.textContent = "Add to Cart";
  

    cart_btn.appendChild(addtocart);
    cart_btn.appendChild(quantityAvail())

    product_details.appendChild(product_title);
    product_details.appendChild(product_rating);
    product_details.appendChild(product_price);
    product_details.appendChild(cart_btn);

    card.appendChild(categoryContainer);
    card.appendChild(product_img);
    card.appendChild(product_details);

    product_container.appendChild(card);

    // Call addtoCart function after creating each product element
    addtoCart(addtocart, product.id, product);
  });
}

// addtowishlist --------------------------
function addtowishlist(product, id) {
  let wishlistbtn = document.createElement("p");
  wishlistbtn.classList.add("wishlistbtn");
  wishlistbtn.innerHTML = `<i class="fa-solid fa-heart heartbtn" style="font-size:25px;"></i>`;

  let addedfav = localStorage.getItem("cart_" + id); // Check if item already in wishlist

  if (addedfav) {
    wishlistbtn.querySelector(".heartbtn").style.color = "red"; // Set color to red if already in wishlist
  }

  wishlistbtn.addEventListener("click", () => {
    if (addedfav) {
      wishlistbtn.querySelector(".heartbtn").style.color = "";
      localStorage.removeItem("cart_" + id);
      addedfav = false;
      updateWishlistCount(
        showToast(
          '<i class="fa-solid fa-heart" style="color:red;"></i>',
          "Product is removed from My Wishlist"
        )
      );
    } else {
      wishlistbtn.querySelector(".heartbtn").style.color = "red";
      localStorage.setItem("cart_" + id, JSON.stringify(product));
      addedfav = true;
      updateWishlistCount(
        showToast(
          '<i class="fa-solid fa-heart" style="color:red;"></i>',
          "Product is added to My Wishlist"
        )
      );
    }
  });

  return wishlistbtn;
}

function updateWishlistCount() {
  let itemCount = "";
  let addwishlist = document.querySelector(".addwishlist");

  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (key.startsWith("cart_")) {
      itemCount++;
    }
  }
  addwishlist.innerHTML = `<i class="fa-solid fa-heart"></i> ${itemCount}`;
}

updateWishlistCount();

// Add to cart function
function addtoCart(addtocart_btn, id, product) {
  addtocart_btn.addEventListener("click", () => {
    let localStorageId = localStorage.getItem("product_" + id);
    // Check if the product is already in the cart
    if (localStorageId) {
      updateCart(
        showToast(
          '<i class="fa-regular fa-circle-check" style="color:springgreen;"></i>',
          "Product is already in the cart"
        )
      );
      return; // Exit the function, no need to proceed further
    }
    // If not in the cart, add the product to the cart
    localStorage.setItem("product_" + id, JSON.stringify(product));
    updateCart(
      showToast(
        '<i class="fa-regular fa-circle-check" style="color:springgreen;"></i>',
        "Product has been added to the cart"
      )
    );
  });
}

function quantityAvail() {
  let quantityAvail = 1
  let quantity = document.createElement('div');
  quantity.classList.add('quantity-container');

  let decrement = document.createElement('button');
  decrement.classList.add('decrement-btn');
  // decrement.type('button')
  decrement.innerHTML = `<i class="fa-solid fa-minus"></i>`;

  let quantity_count = document.createElement('h4');
  quantity_count.classList.add('quantity-count');
  quantity_count.innerHTML = `${quantityAvail}`;

  let increment = document.createElement('button');
  increment.classList.add('increment-btn');
  // increment.type('button')
  increment.innerHTML = `<i class="fa-solid fa-plus"></i>`;

  quantity.appendChild(decrement);
  quantity.appendChild(quantity_count);
  quantity.appendChild(increment);

  increment.addEventListener('click', () => {
    let currentQuantity = parseInt(quantity_count.innerHTML);
    quantity_count.innerHTML = `${currentQuantity + 1}`;
   });

decrement.addEventListener('click', () => {
  let currentQuantity = parseInt(quantity_count.innerHTML);
  if (currentQuantity > 1) {
      quantity_count.innerHTML = `${currentQuantity - 1}`;
  }
  else if (currentQuantity ===  1) {
      quantity_count.innerHTML = `${currentQuantity - 0}`;
  }
});

  return quantity; 
}




function updateCart() {
  let cart = document.querySelector(".cart");
  let itemCount = "";
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (key.startsWith("product_")) {
      itemCount++;
    }
  }
  cart.innerHTML = `<img src="assets/icons/cart.svg" alt="cart"> ${itemCount}`;
}
updateCart();

//toast message
function showToast(msgicon, message) {
  let toastcontainer = document.querySelector(".toast");
  let toastmsg = document.querySelector(".toastmsg");

  setTimeout(() => {
    toastcontainer.style.display = "block";
    toastmsg.innerHTML = `${msgicon} ${message}`;
    setTimeout(() => {
      toastcontainer.style.display = "";
      toastmsg.innerHTML = "";
    }, 1000);
  }, 500);
}

//sidebar

function appBar() {
  const sidebar = document.querySelector(".sidebar");
  const hamburgerIcon = document.querySelector(".hamburger-icon");
  const body = document.querySelector("body");
  const closeSidebar = document.querySelector(".close-sidebar");

  hamburgerIcon.addEventListener("click", function (event) {
    event.stopPropagation();
    sidebar.classList.toggle("open");
    body.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
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

// gototop Button
window.addEventListener("scroll", function () {
  // Get the "Go to Top" button element
  const gototopBtn = document.getElementById("gototopBtn");

  // If the user scrolled more than 20 pixels down, show the button; otherwise, hide it
  if (window.scrollY > 20) {
    gototopBtn.style.display = "flex";
  } else {
    gototopBtn.style.display = "none";
  }
});

// offer code 

const offer_code = document.querySelector(".code")
const offer_summary = document.querySelector(".code-summary")
const date = new Date
const todaysdate = date.getDate()

const getOfferCode  = () =>{
  if(todaysdate >= 1 && todaysdate <= 15){
    offer_summary.textContent = "Get FLAT 10% OFF on all orders"
    offer_code.textContent = "Use Code : OFFER10"
  }
  else if(todaysdate >=16){
    offer_summary.textContent = "Get FLAT 50% OFF on all orders"
    offer_code.textContent = "Use Code : B1G1"
  }
}

getOfferCode()
