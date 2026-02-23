export const createProject = (name) => {
    return {
        id: Date.now(),
        name,
        todos: []
    };
};

export const addTodoToProject = (project, todo) => {
    project.todos.push(todo);
    return project;
};

export const removeTodoFromProject = (project, todoId) => {
    project.todos = project.todos.filter(t => t.id !== todoId);
    return project;
};
