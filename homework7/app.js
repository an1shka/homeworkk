const loginScreen = document.getElementById("loginScreen");
const profileScreen = document.getElementById("profileScreen");
const productsScreen = document.getElementById("productsScreen");
const detailScreen = document.getElementById("detailScreen");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const goToProductsBtn = document.getElementById("goToProductsBtn");
const backtoProfileBtn = document.getElementById("backtoProfileBtn");
const backToProductsBtn = document.getElementById("backToProductsBtn");
const profileBlock = document.getElementById("profileBlock");
const productsBlock = document.getElementById("productsBlock");
const productDetailBlock = document.getElementById("productDetailBlock");
const loginError = document.getElementById("loginError");

function showScreen(screen) {
    loginScreen.classList.add("hidden");

    profileScreen.classList.add("hidden");

    productsScreen.classList.add("hidden");

    detailScreen.classList.add("hidden");

    screen.classList.remove("hidden");
}



async function login(username, password) {
    try {
        const response = await fetch(
            "https://dummyjson.com/auth/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username,
                    password
                })
            }
        );

        if (!response.ok) {
            throw new Error("Ошибка авторизации");
        }

        const data = await response.json();

        localStorage.setItem(
            "token",
            data.accessToken
        );

        getProfile();

    } catch (error) {
        loginError.textContent = error.message;
    }
}



async function getProfile() {
    const token = localStorage.getItem("token");

    if (!token) {
        showScreen(loginScreen);

        return;
    }

    try {
        const response = await fetch(
            "https://dummyjson.com/auth/me",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (!response.ok) {
            throw new Error("Ошибка профиля");
        }

        const user = await response.json();

        profileBlock.innerHTML = `
            <div class="card">
                <img src="${user.image}" />

                <h3>
                    ${user.firstName}
                    ${user.lastName}
                </h3>

                <p>${user.email}</p>

                <p>${user.phone}</p>
            </div>
        `;

        showScreen(profileScreen);

    } catch (error) {
        localStorage.removeItem("token");

        showScreen(loginScreen);
    }
}



async function getProducts() {
    const token = localStorage.getItem("token");

    if (!token) {
        showScreen(loginScreen);

        return;
    }

    try {
        const response = await fetch(
            "https://dummyjson.com/products"
        );

        if (!response.ok) {
            throw new Error(
                "Не удалось загрузить товары"
            );
        }

        const data = await response.json();

        productsBlock.innerHTML = data.products.map(product => `
            <div class="card">

                <img src="${product.thumbnail}" />

                <h3>${product.title}</h3>

                <p>${product.description}</p>

                <p>
                    Цена:
                    ${product.price}$
                </p>

                <p>
                    Рейтинг:
                    ${product.rating}
                </p>

                <button
                    onclick="getProductDetail(${product.id})"
                >
                    Подробнее
                </button>

            </div>
        `).join("");

        showScreen(productsScreen);

    } catch (error) {
        productsBlock.innerHTML = `
            <h2>
                Не удалось загрузить товары
            </h2>
        `;
    }
}



async function getProductDetail(id) {
    try {
        const response = await fetch(
            `https://dummyjson.com/products/${id}`
        );

        if (!response.ok) {
            throw new Error(
                "Не удалось загрузить товар"
            );
        }

        const product = await response.json();

        productDetailBlock.innerHTML = `
            <div class="detail">

                <img src="${product.thumbnail}" />

                <h2>${product.title}</h2>

                <p>
                    ${product.description}
                </p>

                <p>
                    Категория:
                    ${product.category}
                </p>

                <p>
                    Бренд:
                    ${product.brand}
                </p>

                <p>
                    Цена:
                    ${product.price}$
                </p>

                <p>
                    Скидка:
                    ${product.discountPercentage}%
                </p>

                <p>
                    Рейтинг:
                    ${product.rating}
                </p>

                <p>
                    Остаток:
                    ${product.stock}
                </p>

            </div>
        `;

        showScreen(detailScreen);

    } catch (error) {
        productDetailBlock.innerHTML = `
            <h2>
                Не удалось загрузить товар
            </h2>
        `;
    }
}



loginBtn.addEventListener("click", () => {
    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;

    login(username, password);
});



logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");

    showScreen(loginScreen);
});



goToProductsBtn.addEventListener("click", () => {
    getProducts();
});



backtoProfileBtn.addEventListener("click", () => {
    showScreen(profileScreen);
});



backToProductsBtn.addEventListener("click", () => {
    showScreen(productsScreen);
});



getProfile();