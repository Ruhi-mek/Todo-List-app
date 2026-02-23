import { saveUser, loginUser } from './storage.js';

// Initialize authentication UI
export const initAuthUI = () => {
    const loginscreen = document.getElementById('login-screen');
    const signupscreen = document.getElementById('signup-screen');
    const mainscreen = document.getElementById('main-screen');

    const cleaninfo = document.getElementById('clean-info');
    const gotosignup = document.getElementById('go-to-signup');
    const backtologin = document.getElementById('back-to-login');

    const signuptomain = document.getElementById('signup-to-main');
    const logintomain = document.getElementById('login-to-main');

    // Signup handler
    signuptomain.addEventListener('click', () => {
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        if (!name || !email || !password) {
            alert('Please fill all the requirements!');
            return;
        }

        const result = saveUser(name, email, password);
        alert(result.message);
        
        if (result.success) {
            document.getElementById('signup-name').value = '';
            document.getElementById('signup-email').value = '';
            document.getElementById('signup-password').value = '';
            signupscreen.style.display = 'none';
            mainscreen.style.display = 'block';
        }
    });

    // Login handler
    logintomain.addEventListener('click', () => {
        const loginName = document.getElementById('login-name').value;
        const loginPassword = document.getElementById('login-password').value;

        if (!loginName || !loginPassword) {
            alert('Please enter username and password!');
            return;
        }

        const result = loginUser(loginName, loginPassword);
        alert(result.message);
        
        if (result.success) {
            document.getElementById('login-name').value = '';
            document.getElementById('login-password').value = '';
            loginscreen.style.display = 'none';
            mainscreen.style.display = 'block';
        }
    });

    // Clean login form
    cleaninfo.addEventListener('click', () => {
        document.getElementById('login-name').value = '';
        document.getElementById('login-password').value = '';
    });

    // Navigate to signup
    gotosignup.addEventListener('click', () => {
        document.getElementById('login-name').value = '';
        document.getElementById('login-password').value = '';
        loginscreen.style.display = 'none';
        signupscreen.style.display = 'block';
    });

    // Navigate back to login
    backtologin.addEventListener('click', () => {
        document.getElementById('signup-name').value = '';
        document.getElementById('signup-email').value = '';
        document.getElementById('signup-password').value = '';
        signupscreen.style.display = 'none';
        loginscreen.style.display = 'block';
    });
};

export const renderTodo = (todo, onToggle, onDelete) => {
    const li = document.createElement('li');
    li.className = `todo-item priority-${todo.priority} ${todo.completed ? 'completed' : ''}`;
    
    li.innerHTML = `
        <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} data-id="${todo.id}">
        <div class="todo-content">
            <h3>${escapeHtml(todo.title)}</h3>
            ${todo.description ? `<p>${escapeHtml(todo.description)}</p>` : ''}
            <div class="todo-meta">
                ${todo.dueDate ? `<span class="todo-date">📅 ${formatDate(todo.dueDate)}</span>` : ''}
                <span class="todo-priority priority-${todo.priority}">${todo.priority.toUpperCase()}</span>
            </div>
        </div>
        <div class="todo-actions">
            <button class="delete-btn" data-id="${todo.id}">Delete</button>
        </div>
    `;

    const checkbox = li.querySelector('.todo-checkbox');
    checkbox.addEventListener('change', () => onToggle(todo.id));

    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => onDelete(todo.id));

    return li;
};

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const escapeHtml = (text) => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
};
