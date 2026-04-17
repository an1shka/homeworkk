const loginForm = document.getElementById("loginForm")

if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault()

        const name = document.getElementById("name").value.trim()
        const password = document.getElementById("password").value.trim()
        const error = document.getElementById("error")

        error.textContent = ""

        if (name.length < 5 || name.length > 20) {
            error.textContent = "Имя от 5 до 20 символов"
            return
        }

        if (password.length < 5 || password.length > 20) {
            error.textContent = "Пароль от 5 до 20 символов"
            return
        }

        window.location.href = "index.html"
    })
}

const registerForm = document.getElementById("registerForm")

if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault()

        const name = document.getElementById("name").value.trim()
        const email = document.getElementById("email").value.trim()
        const number = document.getElementById("number").value.trim()
        const password = document.getElementById("password").value.trim()
        const error = document.getElementById("error")

        error.textContent = ""

        if (name.length < 5 || name.length > 20) {
            error.textContent = "Имя от 5 до 20 символов"
            return
        }

        if (email.length < 5 || email.length > 20 || !email.includes("@")) {
            error.textContent = "Неверный Email"
            return
        }

        if (!/^\d+$/.test(number)) {
            error.textContent = "Телефон только цифры"
            return
        }

        if (password.length < 5 || password.length > 20) {
            error.textContent = "Пароль от 5 до 20 символов"
            return
        }

        window.location.href = "index.html"
    })
}

const addBtn = document.getElementById("addBtn")

if (addBtn) {
    const input = document.getElementById("taskInput")
    const list = document.getElementById("taskList")
    const error = document.getElementById("error")

    addBtn.addEventListener("click", () => {
        const text = input.value.trim()

        error.textContent = ""

        if (text === "") {
            error.textContent = "Введите задачу"
            return
        }

        const li = document.createElement("li")

        li.innerHTML = `
            <span>${text}</span>
            <button class="delete">✕</button>
        `

        li.querySelector(".delete").addEventListener("click", () => {
            li.remove()
        })

        list.appendChild(li)
        input.value = ""
    })
}



// !/^\vd+$/.test(number) - проверка на цифры в строке