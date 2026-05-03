const API_URL = "https://fakestoreapi.com/products";

const loadBtn = document.getElementById("loadBtn");
const productsDiv = document.getElementById("products");
const searchInput = document.getElementById("searchInput");
const statusDiv = document.getElementById("status");

const cartDiv = document.getElementById("cart");

const pokemonBtn = document.getElementById("pokemonBtn");
const pokemonInput = document.getElementById("pokemonInput");
const pokemonResult = document.getElementById("pokemonResult");

let products = [];

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id) {
    const cart = getCart();
    const item = cart.find(i => i.id === id);

    if (item) {
        item.qty += 1;
    } else {
        cart.push({ id, qty: 1 });
    }

    saveCart(cart);
    renderCart();
}

function changeQty(id, delta) {
    let cart = getCart();

    cart = cart.map(i => {
        if (i.id === id) {
            return { ...i, qty: i.qty + delta };
        }
        return i;
    }).filter(i => i.qty > 0);

    saveCart(cart);
    renderCart();
}

function renderCart() {
    const cart = getCart();

    cartDiv.innerHTML = "";

    if (cart.length === 0) {
        cartDiv.textContent = "Корзина пуста";
        return;
    }

    let total = 0;

    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return;

        total += product.price * item.qty;

        const div = document.createElement("div");
        div.className = "cart-item";

        const info = document.createElement("span");
        info.textContent = `${product.title} x${item.qty}`;

        const controls = document.createElement("div");
        controls.className = "cart-controls";

        const plus = document.createElement("button");
        plus.textContent = "+";
        plus.addEventListener("click", () => changeQty(item.id, 1));

        const minus = document.createElement("button");
        minus.textContent = "-";
        minus.addEventListener("click", () => changeQty(item.id, -1));

        controls.appendChild(plus);
        controls.appendChild(minus);

        div.appendChild(info);
        div.appendChild(controls);

        cartDiv.appendChild(div);
    });

    const totalDiv = document.createElement("div");
    totalDiv.className = "total";
    totalDiv.textContent = `Итого: ${total.toFixed(2)}$`;

    cartDiv.appendChild(totalDiv);
}

function renderProducts(list) {
    productsDiv.innerHTML = "";

    list.forEach(p => {
        const card = document.createElement("div");
        card.className = "card";

        const img = document.createElement("img");
        img.src = p.image;

        const title = document.createElement("h3");
        title.textContent = p.title;

        const price = document.createElement("p");
        price.textContent = `${p.price}$`;

        const desc = document.createElement("p");
        desc.textContent = p.description.slice(0, 60) + "...";

        const btn = document.createElement("button");
        btn.textContent = "В корзину";
        btn.addEventListener("click", () => addToCart(p.id));

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(desc);
        card.appendChild(btn);

        productsDiv.appendChild(card);
    });
}

let searchTimeout;

searchInput.addEventListener("input", () => {
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(() => {
        const value = searchInput.value.toLowerCase();

        const filtered = products.filter(p =>
            p.title.toLowerCase().includes(value)
        );

        renderProducts(filtered);
    }, 300);
});

loadBtn.addEventListener("click", async () => {
    statusDiv.textContent = "Загрузка...";
    productsDiv.innerHTML = "";

    try {
        const res = await fetch(API_URL);

        if (!res.ok) {
            throw new Error("Ошибка загрузки данных");
        }

        products = await res.json();
        renderProducts(products);
        renderCart();

        statusDiv.textContent = "";

    } catch (err) {
        statusDiv.textContent = err.message;
    }
});

pokemonBtn.addEventListener("click", async () => {
    const name = pokemonInput.value.toLowerCase().trim();

    pokemonResult.textContent = "";

    if (!name) return;

    pokemonResult.textContent = "Загрузка...";

    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

        if (!res.ok) {
            throw new Error("Не найдено");
        }

        const data = await res.json();

        pokemonResult.innerHTML = `
            <h3>${data.name}</h3>
            <img src="${data.sprites.front_default}">
            <p>Height: ${data.height}</p>
            <p>Weight: ${data.weight}</p>
            <p>Types: ${data.types.map(t => t.type.name).join(", ")}</p>
        `;

    } catch (err) {
        pokemonResult.textContent = err.message;
    }
});

renderCart();