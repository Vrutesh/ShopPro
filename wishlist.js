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
  removeWishlist(parsedItem);
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

  let cart_btn_container = document.createElement("div");
  cart_btn_container.classList.add("cart-btn-container");
  cart_btn_container.classList.add("justify-content");

  // addtocart button

  let addtocart = document.createElement("button");
  addtocart.classList.add("add-to-cart-btn");
  addtocart.textContent = "Add to Cart";

  let wishlistbtn = document.createElement("a");
  wishlistbtn.classList.add("addwishlistbtn");
  wishlistbtn.innerHTML = `<i class="fa-solid fa-heart" style="font-size:25px;"></i>`;

  cart_btn_container.appendChild(addtocart);
  cart_btn_container.appendChild(wishlistbtn);

  product_price.appendChild(exp_price);
  product_info.appendChild(product_title);
  product_info.appendChild(product_price);
  product_info.appendChild(cart_btn_container);

  // append in product cards
  product_card_container.appendChild(prod_category);
  product_card_container.appendChild(product_img);
  product_card_container.appendChild(product_info);

  container.appendChild(product_card_container);
}

function showWishlist() {
  let addwishlist = document.querySelector(".addwishlist");
  let wishlistProdCount = "";

  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (key.startsWith("cart_")) {
      wishlistProdCount++;
    }
  }
  addwishlist.innerHTML = `<i class="fa-solid fa-heart"></i> ${wishlistProdCount}`;
}
showWishlist();


function removeWishlist(product) {
  let cardWishlistBtns = document.querySelectorAll(".addwishlistbtn");
  let card_container = document.querySelectorAll(".card-container");

  cardWishlistBtns.forEach((cardWishlistBtn, index) => {
    if (localStorage.getItem("cart_" + product.id)) {
      cardWishlistBtn.style.color = "red";

      cardWishlistBtn.addEventListener("click", () => {
        if (cardWishlistBtn.style.color === "red") {
          cardWishlistBtn.style.color = "black";
          localStorage.removeItem("cart_" + product.id);
          card_container[index].style.display = "none";
          showWishlist(
            showToast(
              '<i class="fa-solid fa-heart" style="color:red;"></i>',
              "Product is removed from your Wishlist"
            )
          );
        }
      });
    }
  });
}


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

function showCart(){
  let cart = document.querySelector(".cart");

  let itemCount = ''
  for(let i = 0; i<localStorage.length; i++){
    let key = localStorage.key(i)
    if(key.startsWith('product_')){
      itemCount++
    }
  }
  cart.innerHTML = `<img src="assets/icons/cart.svg" alt="cart"> ${itemCount}`;

}

showCart()

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
window.addEventListener('scroll', function() {
  // Get the "Go to Top" button element
  const gototopBtn = document.getElementById('gototopBtn');
  
  // If the user scrolled more than 20 pixels down, show the button; otherwise, hide it
  if (window.scrollY > 20) {
      gototopBtn.style.display = 'flex';
  } else {
      gototopBtn.style.display = 'none';
  }
});
