import { format, parseISO } from 'date-fns';

// Todo Factory/Constructor
export const Todo = (function() {
  let idCounter = Date.now();

  function Todo(title, description = '', dueDate = null, priority = 'low') {
    this.id = idCounter++;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.createdAt = new Date().toISOString();
    this.completed = false;
  }

  Todo.prototype.toggleComplete = function() {
    this.completed = !this.completed;
  };

  Todo.prototype.getFormattedDate = function() {
    if (!this.dueDate) return 'No due date';
    try {
      const date = parseISO(this.dueDate);
      return format(date, 'MMM dd, yyyy');
    } catch (error) {
      return this.dueDate;
    }
  };

  Todo.prototype.getPriorityColor = function() {
    const colors = {
      high: '#dc3545',
      medium: '#ffc107',
      low: '#28a745'
    };
    return colors[this.priority] || colors.low;
  };

  // Static method to update counter
  Todo.updateCounter = function(newCounter) {
    idCounter = newCounter;
  };

  Todo.getCounter = function() {
    return idCounter;
  };

  return Todo;
})();

export default Todo;