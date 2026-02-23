export const saveToStorage = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
};

export const loadFromStorage = (key) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return null;
    }
};

// User authentication functions
export const saveUser = (name, email, password) => {
    let users = loadFromStorage('users') || [];
    
    if (users.find(user => user.name === name)) {
        return { success: false, message: 'Username already taken!' };
    }
    
    users.push({ name, email, password });
    saveToStorage('users', users);
    return { success: true, message: 'Signup successful!' };
};

export const loginUser = (name, password) => {
    let users = loadFromStorage('users') || [];
    
    const validUser = users.find(user => user.name === name && user.password === password);
    
    if (validUser) {
        saveToStorage('currentUser', validUser);
        return { success: true, message: `Welcome back, ${validUser.name}!` };
    }
    
    return { success: false, message: 'Invalid Username or Password!' };
};

export const getCurrentUser = () => {
    return loadFromStorage('currentUser');
};

export const logoutUser = () => {
    localStorage.removeItem('currentUser');
};
