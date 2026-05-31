// ================= DATA =================

const products = [
  {
    id: 1,
    name: "iPhone 16",
    price: 25990000,
    category: "phone",
    image: "https://placehold.co/200",
    rating: 4.5,
    inStock: true,
  },
  {
    id: 2,
    name: "Samsung S25",
    price: 22990000,
    category: "phone",
    image: "https://placehold.co/200",
    rating: 4.7,
    inStock: true,
  },
  {
    id: 3,
    name: "Xiaomi 15",
    price: 15990000,
    category: "phone",
    image: "https://placehold.co/200",
    rating: 4.3,
    inStock: true,
  },

  {
    id: 4,
    name: "MacBook Air M4",
    price: 29990000,
    category: "laptop",
    image: "https://placehold.co/200",
    rating: 4.9,
    inStock: true,
  },
  {
    id: 5,
    name: "Dell XPS 13",
    price: 27990000,
    category: "laptop",
    image: "https://placehold.co/200",
    rating: 4.8,
    inStock: true,
  },
  {
    id: 6,
    name: "Asus Vivobook",
    price: 18990000,
    category: "laptop",
    image: "https://placehold.co/200",
    rating: 4.2,
    inStock: true,
  },

  {
    id: 7,
    name: "iPad Air",
    price: 16990000,
    category: "tablet",
    image: "https://placehold.co/200",
    rating: 4.6,
    inStock: true,
  },
  {
    id: 8,
    name: "Galaxy Tab S10",
    price: 15990000,
    category: "tablet",
    image: "https://placehold.co/200",
    rating: 4.4,
    inStock: true,
  },
  {
    id: 9,
    name: "Lenovo Tab",
    price: 10990000,
    category: "tablet",
    image: "https://placehold.co/200",
    rating: 4.0,
    inStock: true,
  },

  {
    id: 10,
    name: "AirPods Pro",
    price: 5990000,
    category: "accessory",
    image: "https://placehold.co/200",
    rating: 4.8,
    inStock: true,
  },
  {
    id: 11,
    name: "Sony XM5",
    price: 7990000,
    category: "accessory",
    image: "https://placehold.co/200",
    rating: 4.9,
    inStock: true,
  },
  {
    id: 12,
    name: "Logitech MX Master",
    price: 2490000,
    category: "accessory",
    image: "https://placehold.co/200",
    rating: 4.5,
    inStock: true,
  },
];

// ================= VARIABLES =================

let currentProducts = [...products];
let cartCount = 0;

// ================= APP =================

const app = document.createElement("div");
document.body.appendChild(app);

// ================= HEADER =================

const header = document.createElement("div");
header.className = "header";

const title = document.createElement("h1");
title.textContent = "📦 Product Catalog";

const darkBtn = document.createElement("button");
darkBtn.textContent = "Dark Mode";

header.append(title, darkBtn);
app.appendChild(header);

// ================= CART =================

const cart = document.createElement("div");
cart.className = "cart";

const cartIcon = document.createElement("div");
cartIcon.className = "cart-icon";

cartIcon.textContent = "🛒";

const badge = document.createElement("span");
badge.className = "badge";
badge.textContent = "0";

cartIcon.appendChild(badge);
cart.appendChild(cartIcon);

app.appendChild(cart);

// ================= CONTROLS =================

const controls = document.createElement("div");
controls.className = "controls";

const searchInput = document.createElement("input");
searchInput.placeholder = "Search products...";

const sortSelect = document.createElement("select");

const options = [
  ["", "Sort"],
  ["priceAsc", "Price ↑"],
  ["priceDesc", "Price ↓"],
  ["name", "Name A-Z"],
  ["rating", "Highest Rating"],
];

options.forEach((option) => {
  const op = document.createElement("option");
  op.value = option[0];
  op.textContent = option[1];
  sortSelect.appendChild(op);
});

controls.append(searchInput, sortSelect);

const categories = ["all", "phone", "laptop", "tablet", "accessory"];

categories.forEach((category) => {
  const button = document.createElement("button");

  button.textContent = category;

  button.addEventListener("click", () => {
    filterByCategory(category);
  });

  controls.appendChild(button);
});

app.appendChild(controls);

// ================= PRODUCT CONTAINER =================

const productContainer = document.createElement("div");
productContainer.className = "products";

app.appendChild(productContainer);

// ================= RENDER PRODUCTS =================

function renderProducts(data) {
  productContainer.innerHTML = "";

  data.forEach((product) => {
    const card = document.createElement("div");
    card.className = "card";

    const image = document.createElement("img");
    image.src = product.image;

    const name = document.createElement("h3");
    name.textContent = product.name;

    const price = document.createElement("p");
    price.textContent = product.price.toLocaleString() + " VNĐ";

    const rating = document.createElement("p");
    rating.textContent = "⭐ " + product.rating;

    const addBtn = document.createElement("button");
    addBtn.className = "add-btn";
    addBtn.textContent = "Thêm giỏ";

    addBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      cartCount++;

      badge.textContent = cartCount;
    });

    card.append(image, name, price, rating, addBtn);

    card.addEventListener("click", () => {
      showModal(product);
    });

    productContainer.appendChild(card);
  });
}

// ================= SEARCH =================

function searchProducts(keyword) {
  currentProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(keyword.toLowerCase());
  });

  renderProducts(currentProducts);
}

// ================= FILTER =================

function filterByCategory(category) {
  if (category === "all") {
    currentProducts = [...products];
  } else {
    currentProducts = products.filter((product) => {
      return product.category === category;
    });
  }

  renderProducts(currentProducts);
}

// ================= SORT =================

function sortProducts(type) {
  const sorted = [...currentProducts];

  if (type === "priceAsc") {
    sorted.sort((a, b) => a.price - b.price);
  }

  if (type === "priceDesc") {
    sorted.sort((a, b) => b.price - a.price);
  }

  if (type === "name") {
    sorted.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (type === "rating") {
    sorted.sort((a, b) => b.rating - a.rating);
  }

  renderProducts(sorted);
}

// ================= MODAL =================

function showModal(product) {
  const modal = document.createElement("div");
  modal.className = "modal";

  const content = document.createElement("div");

  content.className = "modal-content";

  const title = document.createElement("h2");

  title.textContent = product.name;

  const price = document.createElement("p");

  price.textContent = "Price: " + product.price.toLocaleString() + " VNĐ";

  const category = document.createElement("p");

  category.textContent = "Category: " + product.category;

  const rating = document.createElement("p");

  rating.textContent = "Rating: ⭐ " + product.rating;

  const stock = document.createElement("p");

  stock.textContent = product.inStock ? "In Stock" : "Out of Stock";

  content.append(title, price, category, rating, stock);

  modal.appendChild(content);

  modal.addEventListener("click", () => {
    modal.remove();
  });

  content.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.body.appendChild(modal);
}

// ================= EVENTS =================

searchInput.addEventListener("input", () => {
  searchProducts(searchInput.value);
});

sortSelect.addEventListener("change", () => {
  sortProducts(sortSelect.value);
});

darkBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// ================= START =================

renderProducts(products);
