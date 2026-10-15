// AdnanTopupShop settings: change sample prices below before publishing.
const WHATSAPP_NUMBER = "923295396021"; // Country code + number, digits only
const products = [
  { id: 1, name: "PUBG UC 60", category: "pubg", amount: "60 UC", price: 350, icon: "🎮", note: "PUBG Mobile" },
  { id: 2, name: "PUBG UC 325", category: "pubg", amount: "325 UC", price: 1700, icon: "🪙", note: "PUBG Mobile" },
  { id: 3, name: "PUBG UC 660", category: "pubg", amount: "660 UC", price: 3200, icon: "💠", note: "PUBG Mobile" },
  { id: 4, name: "Free Fire 100 Diamonds", category: "freefire", amount: "100 Diamonds", price: 320, icon: "💎", note: "Free Fire" },
  { id: 5, name: "Free Fire 310 Diamonds", category: "freefire", amount: "310 Diamonds", price: 950, icon: "💎", note: "Free Fire" },
  { id: 6, name: "Free Fire 520 Diamonds", category: "freefire", amount: "520 Diamonds", price: 1500, icon: "✨", note: "Free Fire" }
];

const productGrid = document.getElementById("productGrid");
const filters = document.querySelectorAll(".filter");

function formatPrice(price) {
  return new Intl.NumberFormat("en-PK").format(price);
}

function orderLink(product) {
  const message = `Assalam-o-Alaikum AdnanTopupShop! I want to order ${product.name} (${product.amount}). Listed price: Rs. ${formatPrice(product.price)}. Please confirm availability, final price, and delivery details.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function renderProducts(category = "all") {
  const visibleProducts = category === "all" ? products : products.filter(p => p.category === category);
  if (!visibleProducts.length) {
    productGrid.innerHTML = '<p class="no-results">No packages found.</p>';
    return;
  }
  productGrid.innerHTML = visibleProducts.map(product => `
    <article class="product-card">
      <div class="product-top"><span class="product-icon" aria-hidden="true">${product.icon}</span><span class="tag">${product.note}</span></div>
      <h3>${product.name}</h3>
      <p class="product-description">${product.amount} package</p>
      <div class="price-row"><span class="price">Rs. ${formatPrice(product.price)}</span><span class="currency">PKR</span></div>
      <a class="order-btn" href="${orderLink(product)}" target="_blank" rel="noopener noreferrer" aria-label="Order ${product.name} on WhatsApp">Order on WhatsApp <span aria-hidden="true">↗</span></a>
    </article>`).join("");
}

filters.forEach(button => button.addEventListener("click", () => {
  filters.forEach(item => item.classList.toggle("active", item === button));
  renderProducts(button.dataset.filter);
}));

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

document.getElementById("contactButton").href = `https://wa.me/${WHATSAPP_NUMBER}`;
document.getElementById("year").textContent = new Date().getFullYear();
renderProducts();
