document.getElementById("nameBtn").addEventListener("click", function () {
    const input = document.getElementById("nameInput");
    const name = input.value.trim();

    const result = document.getElementById("result");
    const error = document.getElementById("error");

    result.textContent = "";
    error.textContent = "";

    if (name === "") {
        error.textContent = "Введите имя";
        return;
    }

    if (name.length < 2) {
        error.textContent = "Имя слишком короткое";
        return;
    }

    result.textContent = "Здравствуйте, " + name + "!";
    input.value = "";
});


document.getElementById("commentBtn").addEventListener("click", function () {
    const input = document.getElementById("commentInput");
    const comment = input.value.trim();

    const result = document.getElementById("commentResult");
    const error = document.getElementById("commentError");

    result.textContent = "";
    error.textContent = "";

    if (comment === "") {
        error.textContent = "Комментарий не может быть пустым";
        return;
    }

    if (comment.length < 5) {
        error.textContent = "Комментарий слишком короткий";
        return;
    }

    if (comment.length > 50) {
        error.textContent = "Комментарий слишком длинный";
        return;
    }

    result.textContent = comment;
    input.value = "";
});