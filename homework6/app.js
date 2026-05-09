// // 1

// const container = document.getElementById("products");

// document.getElementById("loadBtn").onclick = async () => {
//     const res = await fetch("https://fakestoreapi.com/products");

//     const data = await res.json();

//     container.innerHTML = data.map(product => `
//         <div class="card">
//             <img src="${product.image}" />

//             <h3>${product.title}</h3>

//             <p>${product.description}</p>

//             <strong>${product.price}$</strong>
//         </div>
//     `).join("");
// }
// // 2
// const container = document.getElementById("products");

// let products = [];

// document.getElementById("loadBtn").onclick = async () => {
//     const res = await fetch("https://fakestoreapi.com/products");

//     products = await res.json();

//     render(products);
// };

// document.getElementById("search").oninput = (event) => {
//     const value = event.target.value.toLowerCase();

//     const filtered = products.filter(product =>
//         product.title.toLowerCase().includes(value)
//     );

//     render(filtered);
// };

// function render(list) {
//     container.innerHTML = list.map(product => `
//         <div class="card">
//             <img src="${product.image}" />

//             <h3>${product.title}</h3>

//             <p>${product.description}</p>

//             <strong>${product.price}$</strong>
//         </div>
//     `).join("");
// }
// // 3
// const container = document.getElementById("products");

// let products = [];

// document.getElementById("loadBtn").onclick = async () => {
//     try {
//         const res = await fetch("https://fakestoreapi.com/products");

//         if (!res.ok) {
//             throw new Error("Ошибка загрузки");
//         }

//         products = await res.json();

//         render(products);

//     } catch (error) {
//         container.innerHTML = `<h2>${error.message}</h2>`;
//     }
// };

// function render(list) {
//     container.innerHTML = list.map(product => `
//         <div class="card">
//             <img src="${product.image}" />

//             <h3>${product.title}</h3>

//             <p>${product.description}</p>

//             <strong>${product.price}$</strong>
//         </div>
//     `).join("");
// }
// // 4
// const container = document.getElementById("products");

// let products = [];

// document.getElementById("loadBtn").onclick = async () => {
//     try {
//         const res = await fetch("https://fakestoreapi.com/products");

//         if (!res.ok) {
//             throw new Error("Ошибка загрузки");
//         }

//         products = await res.json();

//         render(products);

//     } catch (error) {
//         container.innerHTML = `<h2>${error.message}</h2>`;
//     }
// };

// document.getElementById("search").oninput = (event) => {
//     const value = event.target.value.toLowerCase();

//     const filtered = products.filter(product =>
//         product.title.toLowerCase().includes(value)
//     );

//     render(filtered);
// };

// function addToCart(id) {
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];

//     cart.push(id);

//     localStorage.setItem("cart", JSON.stringify(cart));

//     alert("Добавлено");
// }

// function render(list) {
//     container.innerHTML = list.map(product => `
//         <div class="card">
//             <img src="${product.image}" />

//             <h3>${product.title}</h3>

//             <p>${product.description}</p>

//             <strong>${product.price}$</strong>

//             <button onclick="addToCart(${product.id})">
//                 В корзину
//             </button>
//         </div>
//     `).join("");
// }
// 5
const pokemonContainer = document.getElementById("pokemon");

document.getElementById("pokeBtn").onclick = async () => {
    const value = document
        .getElementById("pokeInput")
        .value
        .toLowerCase();

    try {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${value}`
        );

        if (!response.ok) {
            throw new Error("Покемон не найден");
        }

        const data = await response.json();

        pokemonContainer.innerHTML = `
            <div class="card">
                <img src="${data.sprites.front_default}" />

                <h2>${data.name}</h2>

                <p>Height: ${data.height}</p>

                <p>Weight: ${data.weight}</p>

                <p>
                    Types:
                    ${data.types.map(type => type.type.name).join(", ")}
                </p>
            </div>
        `;

    } catch (error) {
        pokemonContainer.innerHTML = `
            <h2>${error.message}</h2>
        `;
    }
};