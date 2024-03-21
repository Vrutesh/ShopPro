console.log("let's write javascript");

fetch("https://fakestoreapi.com/products")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((product) => {
    displayProduct(product);
    console.log(product);
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });

// display products------------------------

function displayProduct(product) {
  let product_container = document.getElementById("product-container");
  product_container.innerHTML = "";

  product.forEach((product) => {
    let card = document.createElement("div");
    card.classList.add("card");

    let product_img = document.createElement("img");
    product_img.classList.add("product-img");
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

    let cart_btn = document.createElement("div");
    cart_btn.classList.add("cart-btn-container");

    // addtocart button

    let addtocart = document.createElement("button");
    addtocart.classList.add("add-to-cart-btn");
    addtocart.textContent = "Add to Cart";

    cart_btn.appendChild(addtocart);
    cart_btn.appendChild(addtowishlist());

    product_details.appendChild(product_title);
    product_details.appendChild(product_rating);
    product_details.appendChild(product_price);
    product_details.appendChild(cart_btn);

    card.appendChild(product_img);
    card.appendChild(product_details);

    product_container.appendChild(card);
  });
}


// addtowishlist --------------------------

function addtowishlist(){
    let wishlistbtn = document.createElement("p");
    wishlistbtn.classList.add("wishlistbtn");
    wishlistbtn.innerHTML = `<i class="fa-solid fa-heart heartbtn" style="font-size:25px;"></i>`;

    let addedfav = false;
    wishlistbtn.addEventListener("click", () => {
      if (addedfav) {
        wishlistbtn.style.color = "red";
        addedfav = false;
      } else {
        wishlistbtn.style.color = "";
        addedfav = true;
      }

      console.log("click");
    });

    return wishlistbtn
}
