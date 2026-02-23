import '../css/style.css';
import { Todo } from './todo.js';
import { renderTodo, initAuthUI } from './dom.js';
import { saveToStorage, loadFromStorage } from './storage.js';

class TodoApp {
    constructor() {
        this.todos = loadFromStorage('todos') || [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        // Initialize authentication UI first
        initAuthUI();
        
        this.cacheDom();
        this.bindEvents();
        this.render();
    }

    cacheDom() {
        this.todoInput = document.getElementById('todoInput');
        this.descriptionInput = document.getElementById('descriptionInput');
        this.dueDateInput = document.getElementById('dueDateInput');
        this.prioritySelect = document.getElementById('prioritySelect');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');
        this.filterBtns = document.querySelectorAll('.filter-btn');
    }

    bindEvents() {
        this.addBtn.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.setFilter(e.target.dataset.filter));
        });
    }

    addTodo() {
        const title = this.todoInput.value.trim();
        const description = this.descriptionInput.value.trim();
        const dueDate = this.dueDateInput.value;
        const priority = this.prioritySelect.value;

        if (!title) {
            alert('Please enter a todo title');
            return;
        }

        const todo = new Todo(title, description, dueDate, priority);

        this.todos.push(todo);
        this.saveToStorage();
        this.render();
        this.clearInputs();
    }

    clearInputs() {
        this.todoInput.value = '';
        this.descriptionInput.value = '';
        this.dueDateInput.value = '';
        this.prioritySelect.value = 'medium';
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveToStorage();
            this.render();
        }
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.saveToStorage();
        this.render();
    }

    setFilter(filter) {
        this.currentFilter = filter;
        this.filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        this.render();
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(t => !t.completed);
            case 'completed':
                return this.todos.filter(t => t.completed);
            default:
                return this.todos;
        }
    }

    render() {
        const filteredTodos = this.getFilteredTodos();
        this.todoList.innerHTML = '';

        if (filteredTodos.length === 0) {
            this.todoList.innerHTML = '<li style="text-align: center; padding: 20px; color: #999;">No todos to display</li>';
            return;
        }

        filteredTodos.forEach(todo => {
            const todoElement = renderTodo(
                todo,
                (id) => this.toggleTodo(id),
                (id) => this.deleteTodo(id)
            );
            this.todoList.appendChild(todoElement);
        });
    }

    saveToStorage() {
        saveToStorage('todos', this.todos);
    }
}

// Initialize the app
const app = new TodoApp();
