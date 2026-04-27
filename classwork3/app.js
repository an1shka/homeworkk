window.addEventListener('load', () => {
    const savedColor = localStorage.getItem('favoriteColor');
    if (savedColor) {
        displayColor(savedColor);
    }
    let visits = localStorage.getItem('pageVisits');
    visits = visits ? parseInt(visits) : 0;
    visits++;
    
    localStorage.setItem('pageVisits', visits);
    displayVisits(visits);
    const savedNote = localStorage.getItem('noteText');
    if (savedNote) {
        noteTextarea.value = savedNote;
    }

    // Задание 4: приветствие
    const isHidden = localStorage.getItem('greetingHidden');
    if (isHidden === 'true') {
        greeting.classList.add('hidden');
    }
    loadShoppingList();
});



const colorInput = document.getElementById('colorInput');
const saveColorBtn = document.getElementById('saveColorBtn');
const clearColorBtn = document.getElementById('clearColorBtn');
const colorResult = document.getElementById('colorResult');

saveColorBtn.addEventListener('click', () => {
    const color = colorInput.value.trim();
    
    if (!color) {
        alert('Пожалуйста, введите цвет!');
        return;
    }

    localStorage.setItem('favoriteColor', color);
    displayColor(color);
    colorInput.value = '';
});

colorInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        saveColorBtn.click();
    }
});

clearColorBtn.addEventListener('click', () => {
    localStorage.removeItem('favoriteColor');
    colorResult.innerHTML = '';
    colorResult.classList.remove('active');
    colorInput.value = '';
});

function displayColor(color) {
    colorResult.textContent = `Ваш любимый цвет: ${color}`;
    colorResult.classList.add('active');
}

const counterText = document.getElementById('counterText');
const statsText = document.getElementById('statsText');
const resetCounterBtn = document.getElementById('resetCounterBtn');

resetCounterBtn.addEventListener('click', () => {
    localStorage.removeItem('pageVisits');
    counterText.textContent = 'Вы открыли страницу 0 раз';
    statsText.textContent = 'Счетчик сброшен. Обновите страницу.';
});

function getEnding(num) {
    if (num % 10 === 1 && num % 100 !== 11) return 'раз';
    if (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)) return 'раза';
    return 'раз';
}

function displayVisits(visits) {
    const ending = getEnding(visits);
    counterText.textContent = `Вы открыли страницу ${visits} ${ending}`;
    statsText.textContent = `Дата последнего визита: ${new Date().toLocaleString('ru-RU')}`;
}

const noteTextarea = document.getElementById('noteTextarea');
const saveNoteBtn = document.getElementById('saveNoteBtn');
const clearNoteBtn = document.getElementById('clearNoteBtn');
const noteMessage = document.getElementById('noteMessage');


saveNoteBtn.addEventListener('click', () => {
    const noteText = noteTextarea.value;
    localStorage.setItem('noteText', noteText);
    
    noteMessage.textContent = '✓ Заметка сохранена!';
    noteMessage.className = 'message success';
    
    setTimeout(() => {
        noteMessage.className = 'message';
    }, 2000);
});

clearNoteBtn.addEventListener('click', () => {
    if (noteTextarea.value.trim() === '') {
        noteMessage.textContent = 'Заметка уже пуста';
        noteMessage.className = 'message deleted';
    } else {
        if (confirm('Вы уверены, что хотите удалить заметку?')) {
            localStorage.removeItem('noteText');
            noteTextarea.value = '';
            
            noteMessage.textContent = '🗑️ Заметка удалена!';
            noteMessage.className = 'message deleted';
        }
    }
    
    setTimeout(() => {
        noteMessage.className = 'message';
    }, 2000);
});

const greeting = document.getElementById('greeting');
const hideGreetingBtn = document.getElementById('hideGreetingBtn');
const resetGreetingBtn = document.getElementById('resetGreetingBtn');

hideGreetingBtn.addEventListener('click', () => {
    greeting.classList.add('hidden');
    localStorage.setItem('greetingHidden', 'true');
});

resetGreetingBtn.addEventListener('click', () => {
    greeting.classList.remove('hidden');
    localStorage.removeItem('greetingHidden');
});

const itemInput = document.getElementById('itemInput');
const addItemBtn = document.getElementById('addItemBtn');
const list = document.getElementById('list');
const clearAllBtn = document.getElementById('clearAllBtn');

addItemBtn.addEventListener('click', () => {
    addItem();
});

itemInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addItem();
    }
});

clearAllBtn.addEventListener('click', () => {
    if (list.innerHTML !== '' && confirm('Вы уверены, что хотите удалить все товары?')) {
        localStorage.removeItem('shoppingList');
        list.innerHTML = '';
    }
});

function addItem() {
    const itemText = itemInput.value.trim();
    
    if (!itemText) {
        alert('Введите название товара!');
        return;
    }

    let items = getShoppingList();
    items.push(itemText);
    
    localStorage.setItem('shoppingList', JSON.stringify(items));
    displayItem(itemText);
    
    itemInput.value = '';
    itemInput.focus();
}

function getShoppingList() {
    const stored = localStorage.getItem('shoppingList');
    return stored ? JSON.parse(stored) : [];
}

function loadShoppingList() {
    const items = getShoppingList();
    list.innerHTML = '';
    
    items.forEach(item => {
        displayItem(item);
    });
}

function displayItem(item) {
    const p = document.createElement('p');
    p.textContent = item;
    list.appendChild(p);
}

const tabBtns = document.querySelectorAll('.tab-btn');
const taskContents = document.querySelectorAll('.task-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        tabBtns.forEach(b => b.classList.remove('active'));
        taskContents.forEach(content => content.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});