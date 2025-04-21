document.addEventListener('DOMContentLoaded', function () {
    const formInput = document.querySelector('.form-input');
    const todoInput = document.querySelector('#form-input-1');
    const priorityInput = document.querySelector('#priority-select'); // new
    const todoList = document.querySelector('#to-do-list');
    const sunIcon = document.querySelector('#light-mode-icon');
    const moonIcon = document.querySelector('#dark-mode-icon');
    const body = document.body;

    let allTodos = getTodos();
    updateTodoList();

    formInput.addEventListener('submit', function (e) {
        e.preventDefault();
        addTodo();
    });

    function addTodo() {
        const todoText = todoInput.value.trim();
        const priorityValue = priorityInput.value; // get selected priority

        if (todoText.length > 0) {
            const todoObject = {
                text: todoText,
                completed: false,
                priority: priorityValue //  store priority
            };
            allTodos.push(todoObject);
            updateTodoList();
            saveTodos();
            todoInput.value = '';
        }
    }

    function updateTodoList() {
        todoList.innerHTML = '';

        const priorityOrder = { high: 1, medium: 2, low: 3 }; //  sort logic

        // sort tasks by priority before rendering
        const sortedTodos = [...allTodos].sort((a, b) => {
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });

        sortedTodos.forEach((todo, todoIndex) => {
            const todoItem = createTodoItem(todo, todoIndex);
            todoList.appendChild(todoItem);
        });
    }

    function createTodoItem(todo, todoIndex) {
        const todoId = `todo-${todoIndex}`;
        const todoLI = document.createElement('li');
        todoLI.className = 'items';

        todoLI.innerHTML = `
        <input type="checkbox" id="${todoId}" ${todo.completed ? 'checked' : ''}>
        <label class="custom-checkbox" for="${todoId}">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
        </label>
        <label class="items-inside" id="to-do-text" for="${todoId}" class="todo-text" >${todo.text}</label>
        <span class="priority-tag">${todo.priority}</span> <!-- ✅ priority label -->
        <button class="delete-button">
            <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
        </button>
        `;

        const deleteButton = todoLI.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => {
            deleteTodoItem(todoIndex);
        });

        const checkbox = todoLI.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => {
            allTodos[todoIndex].completed = checkbox.checked;
            saveTodos();
        });

        return todoLI;
    }

    function deleteTodoItem(todoIndex) {
        allTodos = allTodos.filter((_, i) => i !== todoIndex);
        saveTodos();
        updateTodoList();
    }

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(allTodos));
    }

    function getTodos() {
        const todos = localStorage.getItem('todos');
        return todos ? JSON.parse(todos) : [];
    }

    
    if (sunIcon && moonIcon) {
        // Load theme from localStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        } else {
            body.classList.remove('dark-mode');
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        }
    
        // Switch to dark mode
        moonIcon.addEventListener('click', () => {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        });
    
        // Switch to light mode
        sunIcon.addEventListener('click', () => {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        });
    } else {
        console.warn('Icons not found in the DOM!');
    }
    

});
