function getProduct() {
  let products = [];

  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);

    if (key.startsWith("product_")) {
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

function orderDetails(products) {
  let total = 0;

  products.forEach((parsedItem) => {
    total += parsedItem.price;
  });

  let container = document.querySelector("#order_details");

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

  // divider
  let divider = document.createElement("div");
  divider.classList.add("divider");

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

  let total_charges_heading = document.createElement("p");
  total_charges_heading.classList.add("order-heading");
  total_charges_heading.innerText = "Total Amount";

  let total_charges = document.createElement("h3");
  total_charges.classList.add("total");
  let totalAmount = localStorage.getItem("totalamount");
  totalAmount = parseFloat(totalAmount);
  if (!isNaN(totalAmount)) {
    total_charges.innerHTML = `$${totalAmount.toFixed(2)}`;
  } else {
    total_charges.innerHTML = "Invalid amount";
  }

  total_charges_container.appendChild(total_charges_heading);
  total_charges_container.appendChild(total_charges);

  //placeorder container
  let placeorder_container = document.createElement("div");
  placeorder_container.classList.add("placeorder-btn-container");

  let placeorder_btn = document.createElement("button");
  placeorder_btn.classList.add("placeorder-btn");
  placeorder_btn.classList.add("cart-container-btns");
  placeorder_btn.innerHTML = `Place Order`;

  placeorder_container.appendChild(placeorder_btn);

  // append in Summary Container
  summary_container.appendChild(price_heading);
  summary_container.appendChild(sub_total);
  summary_container.appendChild(delivery_container);
  summary_container.appendChild(divider);
  summary_container.appendChild(total_charges_container);
  summary_container.appendChild(placeorder_container);

  // append in main container
  container.appendChild(summary_container);
}

let product_details = getProduct();
orderDetails(product_details);

let backBtn = document.querySelector(".back-btn");
backBtn.addEventListener("click", () => {
  window.location.href = "cart.html";
});

function formValidation() {
  let form_groups = document.querySelectorAll(".form-group");
  let placeorder_btn = document.querySelector(".placeorder-btn");

  form_groups.forEach((form_group) => {
    let input = form_group.querySelectorAll(".input");

    let errormsg = document.createElement("p");
    errormsg.classList.add("error-msg");
    errormsg.textContent = "Please fill all input fields";

    placeorder_btn.addEventListener("click", () => {
      input.forEach((inputField) => {
        if (inputField.value === "") {
          errormsg.style.display = "block";
          errormsg.style.color = "red";
          errormsg.style.marginLeft = "10px";
          form_group.appendChild(errormsg);
        } else {
          errormsg.style.display = "none";
        }
      });
    });
  });
}

formValidation();
