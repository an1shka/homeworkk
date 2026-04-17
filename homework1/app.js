const title = document.getElementById("title")
const texts = document.getElementsByClassName("text")
const paragraphs = document.getElementsByTagName("p")
const firstBtn = document.querySelector("button")
const allP = document.querySelectorAll("p")

console.log(title)
console.log(texts)
console.log(paragraphs)
console.log(firstBtn)
console.log(allP)

const changeTextBtn = document.getElementById("changeTextBtn")
const content = document.getElementById("content")

changeTextBtn.addEventListener("click", () => {
    title.textContent = "DOM работает!"
    content.innerHTML = "<b>Это жирный текст</b>"
})

const img = document.getElementById("img")
const link = document.getElementById("link")

changeTextBtn.addEventListener("click", () => {
    img.src = "https://via.placeholder.com/200"
    img.alt = "new image"

    link.href = "https://youtube.com"
    link.textContent = "YouTube"
})

const colorBtn = document.getElementById("colorBtn")

colorBtn.addEventListener("click", () => {
    title.style.color = "red"
    title.style.fontSize = "30px"
    title.style.background = "yellow"

    document.querySelectorAll(".text").forEach(p => {
        p.style.color = "blue"
        p.style.fontSize = "20px"
    })
})

const themeBtn = document.getElementById("themeBtn")
const message = document.getElementById("message")

themeBtn.addEventListener("click", () => {
    message.classList.toggle("dark")
})

let count = 0
const counter = document.getElementById("counter")

document.getElementById("plus").onclick = () => {
    count++
    counter.textContent = count
}

document.getElementById("minus").onclick = () => {
    count--
    counter.textContent = count
}

const password = document.getElementById("password")
const togglePassword = document.getElementById("togglePassword")

togglePassword.addEventListener("click", () => {
    if (password.type === "password") {
        password.type = "text"
        togglePassword.textContent = "Скрыть"
    } else {
        password.type = "password"
        togglePassword.textContent = "Показать"
    }
})

const hoverBox = document.getElementById("hoverBox")

hoverBox.addEventListener("mouseover", () => {
    hoverBox.style.background = "green"
})

hoverBox.addEventListener("mouseout", () => {
    hoverBox.style.background = "lightgray"
})

document.getElementById("alertBtn").onclick = () => {
    alert("Кнопка нажата")
}

const liveInput = document.getElementById("liveInput")
const liveText = document.getElementById("liveText")

liveInput.addEventListener("input", () => {
    liveText.textContent = "Вы ввели: " + liveInput.value
})

const nameInput = document.getElementById("nameInput")
const sendBtn = document.getElementById("sendBtn")
const result = document.getElementById("result")

sendBtn.addEventListener("click", () => {
    const name = nameInput.value.trim()

    if (name === "") {
        result.textContent = "Введите имя"
    } else {
        result.textContent = "Привет, " + name + "!"
    }
})