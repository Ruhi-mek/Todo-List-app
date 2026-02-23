import { saveUser, loginUser } from './storage.js';

export const initAuthUI = (todoApp) => {
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
            loginscreen.style.display = 'block';
            
            // Load todos for new user (will be empty)
            todoApp.loadUserTodos();
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
            
            // Load todos for logged in user
            todoApp.loadUserTodos();
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
    // Clone the template
    const template = document.getElementById('todo-template');
    const clone = template.content.cloneNode(true);
    
    // Get the li element
    const li = clone.querySelector('.todo-item');
    li.className = `todo-item priority-${todo.priority} ${todo.completed ? 'completed' : ''}`;
    
    // Set checkbox
    const checkbox = clone.querySelector('.todo-checkbox');
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => onToggle(todo.id));
    
    // Set title
    const title = clone.querySelector('.todo-title');
    title.textContent = todo.title;
    
    // Set description
    const description = clone.querySelector('.todo-description');
    if (todo.description) {
        description.textContent = todo.description;
    } else {
        description.remove();
    }
    
    // Set date
    const dateSpan = clone.querySelector('.todo-date');
    if (todo.dueDate) {
        dateSpan.textContent = `📅 ${formatDate(todo.dueDate)}`;
    } else {
        dateSpan.remove();
    }
    
    // Set priority
    const prioritySpan = clone.querySelector('.todo-priority');
    prioritySpan.className = `todo-priority priority-${todo.priority}`;
    prioritySpan.textContent = todo.priority.toUpperCase();
    
    // Set delete button
    const deleteBtn = clone.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => onDelete(todo.id));
    
    return clone;
};

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};
