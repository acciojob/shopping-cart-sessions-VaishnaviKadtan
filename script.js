// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearBtn = document.getElementById("clear-cart-btn");

// Load cart from sessionStorage or start empty
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// Save cart to sessionStorage
function saveCart() {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Render product list
function renderProducts() {
  productList.innerHTML = "";
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price}
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });

  // Attach event listeners
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-id"));
      addToCart(id);
    });
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = "";

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  cart.push(product);
  saveCart();
  renderCart();
}

// Clear cart
function clearCart() {
  cart = [];
  saveCart();
  renderCart();
}

// Event listener for clear cart button
clearBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();