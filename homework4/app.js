// 1
/*
const colorInput = document.getElementById('colorInput');
const saveColorBtn = document.getElementById('saveColor');
const colorText = document.getElementById('colorText');

saveColorBtn.addEventListener('click', () => {
    const color = colorInput.value;
    localStorage.setItem('favoriteColor', color);
    colorText.textContent = 'Ваш любимый цвет: ' + color;
});

const savedColor = localStorage.getItem('favoriteColor');
if (savedColor) {
    colorText.textContent = 'Ваш любимый цвет: ' + savedColor;
}
*/

// 2
/*
let visits = localStorage.getItem('visits');

if (!visits) {
    visits = 0;
}

visits = Number(visits) + 1;
localStorage.setItem('visits', visits);

document.getElementById('visitCount').textContent =
    `Вы открыли страницу ${visits} раз`;
*/

// 3
/*
const noteInput = document.getElementById('noteInput');
const saveNoteBtn = document.getElementById('saveNote');

saveNoteBtn.addEventListener('click', () => {
    localStorage.setItem('note', noteInput.value);
});

const savedNote = localStorage.getItem('note');
if (savedNote) {
    noteInput.value = savedNote;
}
*/

// 4
/*
const welcomeBlock = document.getElementById('welcomeBlock');
const hideBtn = document.getElementById('hideWelcome');

hideBtn.addEventListener('click', () => {
    welcomeBlock.style.display = 'none';
    localStorage.setItem('hideWelcome', 'true');
});

if (localStorage.getItem('hideWelcome') === 'true') {
    welcomeBlock.style.display = 'none';
}
*/

// 5
const itemInput = document.getElementById('itemInput');
const addItemBtn = document.getElementById('addItem');
const list = document.getElementById('shoppingList');

let items = JSON.parse(localStorage.getItem('items')) || [];

function renderList() {
    list.innerHTML = '';
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
    });
}

addItemBtn.addEventListener('click', () => {
    const value = itemInput.value;

    if (!value) return;

    items.push(value);
    localStorage.setItem('items', JSON.stringify(items));

    itemInput.value = '';
    renderList();
});

renderList();