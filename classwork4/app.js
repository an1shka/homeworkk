//переменые регистрации
const registerScreen = document.querySelector("#registerScreen")
const registerForm = document.querySelector("#registerForm")
const registerName = document.querySelector("#registerName")
const registerEmail = document.querySelector("#registerEmail")
const registerPassword = document.querySelector("#registerPassword")
const registerError = document.querySelector("#registerError")
const goToLoginBtn = document.querySelector("#goToLoginBtn")

//переменные входа
const loginScreen = document.querySelector("#loginScreen")
const loginForm = document.querySelector("#loginForm")
const loginEmail = document.querySelector("#LoginEmail")
const loginPassword = document.querySelector("#LoginPassword")
const loginError = document.querySelector("#loginError")
const goToRegisterBtn = document.querySelector("#goToRegisterBtn")

//переменные магазина
const shopScreen = document.querySelector("#shopScreen")
const productList = document.querySelector("#productList")
const cartList = document.querySelector("#cartList")
const cartTotal = document.querySelector("#cartTotal")
const logoutBtn = document.querySelector("#logoutBtn")
const userInfo = document.querySelector("#userInfo")

//функия переключения жкранов

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

//кнопки перехода

goToLoginBtn.addEventListener("click", showLoginScreen)
goToRegisterBtn.addEventListener("click", showRegisterScreen)

//добавление юзера в локал сторедж
function saveUser(user){
    localStorage.setItem("user", JSON.stringify(user))
}
//вызов данных из локал сторедж
function getUser(user){
    const user = localStorage.get("user")

    if(user === null){
        return null
    }
    return JSON.parse(user)
}

//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//
//регистрация
registerForm.addEventListener("submit", (event) => {
    event.preventDefault()

    const name = registerName.value.trim()
    const email = registerEmail.value.trim()
    const password = registerPassword.value.trim()

    registerError.textContent = ""

    if(name.length < 2){
        registerError.textContent = "Имя должно быть не менее 2 символов"
        registerError.style.colot = "reg"
        return
    }
    if(!email.includes("@")){
        registerError.textContent = "Некорректный email"
        registerError.style.color = "red"
        return
    }
    if(password.length < 6){
        registerError.textContent = "Пароль должен быть не менее 6 символов"
        registerError.style.color = "red"
        return
    }
    
})