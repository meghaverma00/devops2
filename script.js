const products = [
  { name: "Dash Runner",  type: "Running",  price: 89,  color: "#E5484D" },
  { name: "Cloud Walk",   type: "Casual",   price: 74,  color: "#3E8E7E" },
  { name: "Court Classic",type: "Casual",   price: 82,  color: "#F2E94E" },
  { name: "Trail Grip",   type: "Running",  price: 104, color: "#7A5C3E" },
  { name: "Daily Low",    type: "Everyday", price: 68,  color: "#1B3A8C" },
  { name: "Night Stride", type: "Everyday", price: 79,  color: "#2B2B3C" }
];
const heroColors = ["#F2E94E", "#E5484D", "#FFFFFF", "#3E8E7E", "#0F1C3F"];

// Draw a side-view sneaker in any color
function shoeSVG(color) {
  return `
  <svg viewBox="0 0 300 160" role="img" aria-label="Sneaker">
    <path d="M18 118 L288 118 Q292 142 262 143 L48 143 Q20 142 18 118Z" fill="#fff"/>
    <path d="M18 128 L290 128" stroke="#C9D0DD" stroke-width="3"/>
    <path d="M24 118 L24 84 Q24 68 42 66 L92 60 Q108 36 140 48 L176 74 Q220 80 252 94 Q286 104 288 118Z" fill="${color}"/>
    <path d="M24 118 L24 96 Q60 100 82 118Z" fill="rgba(0,0,0,.18)"/>
    <path d="M96 62 L128 80 M110 54 L140 74 M124 50 L152 70" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".9"/>
    <path d="M120 112 Q170 78 250 100" stroke="#fff" stroke-width="7" stroke-linecap="round" fill="none" opacity=".85"/>
    <path d="M42 66 Q30 70 30 84" stroke="rgba(0,0,0,.2)" stroke-width="3" fill="none"/>
  </svg>`;
}

// Hero: color picker
const heroShoe = document.getElementById("heroShoe");
const swatches = document.getElementById("swatches");
function setHero(color) {
  heroShoe.innerHTML = shoeSVG(color);
  [...swatches.children].forEach(b => b.classList.toggle("on", b.dataset.c === color));
}
heroColors.forEach(c => {
  const b = document.createElement("button");
  b.className = "swatch";
  b.dataset.c = c;
  b.style.background = c;
  b.setAttribute("aria-label", "Color " + c);
  b.onclick = () => setHero(c);
  swatches.appendChild(b);
});
setHero(heroColors[0]);

// Shop grid + filters
const grid = document.getElementById("grid");
const filters = document.getElementById("filters");
const types = ["All", ...new Set(products.map(p => p.type))];
let active = "All";

function renderGrid() {
  grid.innerHTML = "";
  products
    .filter(p => active === "All" || p.type === active)
    .forEach(p => {
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <div class="pic">${shoeSVG(p.color)}</div>
        <div class="info">
          <h3>${p.name}</h3>
          <span class="type">${p.type}</span>
          <div class="row">
            <span class="price">$${p.price}</span>
            <button class="add">Add to cart</button>
          </div>
        </div>`;
      card.querySelector(".add").onclick = () => addToCart(p.name);
      grid.appendChild(card);
    });
}
types.forEach(t => {
  const b = document.createElement("button");
  b.textContent = t;
  b.onclick = () => {
    active = t;
    [...filters.children].forEach(x => x.classList.toggle("on", x === b));
    renderGrid();
  };
  if (t === "All") b.classList.add("on");
  filters.appendChild(b);
});
renderGrid();

// Cart
let count = 0;
const countEl = document.getElementById("cartCount");
const toast = document.getElementById("toast");
let timer;
function addToCart(name) {
  count++;
  countEl.textContent = count;
  toast.textContent = name + " added to cart";
  toast.classList.add("show");
  clearTimeout(timer);
  timer = setTimeout(() => toast.classList.remove("show"), 1800);
}
document.getElementById("cartBtn").onclick = () => {
  toast.textContent = count ? `You have ${count} item${count > 1 ? "s" : ""} in your cart` : "Your cart is empty";
  toast.classList.add("show");
  clearTimeout(timer);
  timer = setTimeout(() => toast.classList.remove("show"), 1800);
};