// Переменные регистрация
const registerScreen = document.querySelector("#registerScreen")
const registerForm = document.querySelector("#registerForm")
const registerName = document.querySelector("#registerName")
const registerEmail = document.querySelector("#registerEmail")
const registerPassword = document.querySelector("#registerPassword")
const registerError = document.querySelector("#registerError")
const goToLoginBtn = document.querySelector("#goToLoginBtn")

// Переменные логина
const loginScreen = document.querySelector("#loginScreen")
const loginForm = document.querySelector("#loginForm")
const loginEmail = document.querySelector("#loginEmail")
const loginPassword = document.querySelector("#loginPassword")
const loginError = document.querySelector("#loginError")
const goToRegisterBtn = document.querySelector("#goToRegisterBtn")

// Переменные магазина
const shopScreen = document.querySelector("#shopScreen")
const userInfo = document.querySelector("#userInfo")
const logoutBtn = document.querySelector("#logoutBtn")
const productList = document.querySelector("#productList")
const cartList = document.querySelector("#cartList")
const cartTotal = document.querySelector("#cartTotal")

// Функции переключения экранов
function showRegisterScreen(){
    registerScreen.hidden = false
    loginScreen.hidden = true
    shopScreen.hidden = true
}
function showLoginScreen(){
    registerScreen.hidden = true
    loginScreen.hidden = false
    shopScreen.hidden = true
} 
function showShopScreen(){
    registerScreen.hidden = true
    loginScreen.hidden = true
    shopScreen.hidden = false
}

// Кнопки перехода
goToLoginBtn.addEventListener("click", ()=>{
    showLoginScreen()
})
goToRegisterBtn.addEventListener("click", () =>{
    showRegisterScreen()
})

// Функция для localStorage users
// Добавление юзера в LS
function saveUser(user){
    localStorage.setItem("user", JSON.stringify(user))
}
// Вызов данных из LS
function getUser(){
    const user = localStorage.getItem("user")

    if(user === null){
        return null
    }
    return JSON.parse(user)
}

// РЕГИСТРАЦИЯ
registerForm.addEventListener("submit", (event) =>{
    event.preventDefault()

    const name = registerName.value.trim()
    const email = registerEmail.value.trim()
    const password = registerPassword.value.trim()

    registerError.textContent = ""

    if(name.length < 2){
        registerError.textContent ="Имя должно быть минимум 2 символа"
        registerError.style.color = "red"
        return
    }
    if(!email.includes("@")){
        registerError.textContent = "Email должен содержать @"
        registerError.style.color = "red"
        return
    }
    if(password.length < 6){
        registerError.textContent ="Пароль должно быть минимум 6 символов"
        registerError.style.color = "red"
        return
    }
    const user = {
        name: name,
        email: email,
        password: password
    }
    saveUser(user)
    registerForm.reset()
    showLoginScreen()
})

//логин

loginForm.addEventListener("submit", (event) => {
    event.preventDefault()

    const email = loginEmail.value.trim()
    const password = loginPassword.value.trim()

    loginError.textContent = ""

    const savedUser = getUser()

    if(savedUser === null){
        loginError.textContent = "Сначало нужно зарегестрироватся"
        loginError.style.color = "red"
        return
    }

    if(email !== savedUser.email){
        loginError.textContent = "Неверный логин"
        loginError.style.color = "red"
        return
    } 

    if(password !== savedUser.password){
        loginError.textContent = "Неверный пароль"
        loginError.style.color = "red"
        return
    }

    localStorage.setItem("isAuth", "true")

    loginForm.reset()

    startShop()
})

//magazine

const products = [
    {
        id: 1,
        title:"ноутбук",
        price: 350000
    },
    {
        id: 2,
        title:"смартфон",
        price: 210000
    },
    {
        id: 3,
        title:"клавиатура",
        price: 25000
    },


]

// корзина

let cart = []
//имитация запроса к серверу через Promise
function fakeFetchProducts(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products)
        }, 2000)
    })
}

//Загрузка товаров asumc/await
async function loadProducts(){
    productList.textContent = "Загрузка..."

    const loadedProducts = await fakeFetchProducts()

    renderProducts(loadedProducts)
}

//рендер продуктов
function renderProducts(productsArray){
    productList.innerHTML = ""

    productsArray.forEach((product) => {
        productList.innerHTML += `
        <div>
            <h4>${product.title}</h4>
            <p>Цена: ${product.price} тг</p>
            <button class="addToCardBtn" data-id = "${product.id}">Добавить корзину</button>
        </div>
        <hr>
        `
    })
}

//запуск магазина
function startShop(){
    const savedUser = getUser()

    if(savedUser !==  null){
        userInfo.textContent = `Пользователь: ${savedUser.name}`
    }

    showShopScreen()
    loadCartFromStorage()
    renderCart()
    loadProducts()
}

//созранение корзины в лс
function saveCartToStorage(){
    localStorage.setItem("cart", JSON.stringify(cart))
}

//загрузка корзины из лс
function loadCartFromStorage(){
    const savedCart = localStorage.getItem("cart")
    
    if(savedCart === null){
        cart = []
        return
    }
    cart = JSON.parse(savedCart)
}


//добавление в корзину
productList.addEventListener("click", (event) => {
    if(event.target.classList.contains("addToCardBtn")){
        const productId = parseInt(event.target.dataset.id)

        const product = products.find((item) => {
            return item.id === productId
        })
        cart.push(product)
        saveCartToStorage()
        renderCart()
    }
})

//рендер корзины
function renderCart(){
    cartList.innerHTML = ""
    if(cart.length === 0){
        cartList.textContent = "Корзина пуста"
        cartTotal.textContent = "итого: 0 тг"
        return
    }

    cart.forEach((product, index) => {
        cartList.innerHTML += `
        <div>
            <span>${product.title} - ${product.price} тг</span>
            <button class = "removeFromCartBtn" data-index = "${index}">Удалить</button>
        </div>
        `
    })

    const total = cart.reduce((sum, product) => {
        return sum + product.price
    }, 0)
    cartTotal.textContent = `Итого: ${total} тг`
}

// удалениеиз козрины

cartList.addEventListener("click", (event) => {
    if(event.target.classList.contains("removeFromCartBtn")){
        const index = Number(event.target.dataset.index)
        cart.splice(index,1)
        saveCartToStorage()
        renderCart()
    }
})

//кнопка выйти
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("isAuth")
    showLoginScreen()
})

//проверка авторизации
function checkAuth(){
    const isAuth = localStorage.getItem("isAuth")

    if(isAuth === "true"){
        startShop()
    }
    else{
        showRegisterScreen()
    }
}

checkAuth()