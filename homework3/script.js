const taskList = document.getElementById("taskList")
const addTaskBtn = document.getElementById("addTaskBtn")
const textInput = document.getElementById("textInput")

taskList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
        event.target.parentElement.remove()
        return;
    }

    if (event.target.classList.contains("task_item")) {
        event.target.classList.toggle("done")
    }
})
function addTask() {
    const taskText = textInput.value.trim()

    if (taskText === "") return

    const li = document.createElement("li")
    li.classList.add("task_item")
    li.innerHTML = `
        ${taskText}
        <button class="delete-btn">Удалить</button>
    `

    taskList.appendChild(li)
    textInput.value = ""
}
addTaskBtn.addEventListener("click", addTask)
textInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask()
    }
})