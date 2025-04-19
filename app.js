document.addEventListener('DOMContentLoaded', function () {
    const formInput = document.querySelector('.form-input');
    const todoInput = document.querySelector('#form-input-1');
    const todoList = document.querySelector('#to-do-list');

    let allTodos = getTodos(); // Retrieve todos from localStorage
    updateTodoList(); // Update the list on page load

    formInput.addEventListener('submit', function (e) {
        e.preventDefault();
        addTodo();
    });

    // Add new todo
    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText.length > 0) {
            const todoObject = {
                text: todoText,
                completed: false,
            };
            allTodos.push(todoObject);
            updateTodoList();
            saveTodos();
            todoInput.value = '';
        }
    }

    // Update the todo list display
    function updateTodoList() {
        todoList.innerHTML = '';
        allTodos.forEach((todo, todoIndex) => {
            const todoItem = createTodoItem(todo, todoIndex);
            todoList.appendChild(todoItem);
        });
    }

    // Create each todo item
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

        // Handle checkbox state change
    checkbox.addEventListener('change', () => {
        allTodos[todoIndex].completed = checkbox.checked;

        // If checked, mark the text as struck-through, else remove it
        const todoText = todoLI.querySelector('.todo-text');
        if (checkbox.checked) {
            todoText.style.textDecoration = 'line-through';
            todoText.style.color = 'var(--text-color)';  // Apply your color for crossed-out text
        } else {
            todoText.style.textDecoration = 'none';
            todoText.style.color = '';  // Reset color
        }

        saveTodos();
    });


    // Delete a todo item
    function deleteTodoItem(todoIndex) {
        allTodos = allTodos.filter((_, i) => i !== todoIndex);
        saveTodos();
        updateTodoList();
    }

    // Save todos to localStorage
    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(allTodos));
    }

    // Retrieve todos from localStorage
    function getTodos() {
        const todos = localStorage.getItem('todos');
        return todos ? JSON.parse(todos) : [];
    }
});

