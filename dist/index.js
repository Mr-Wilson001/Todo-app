"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoList = void 0;
const readline = require("readline");
class TodoList {
    constructor() {
        this.todos = [];
        this.nextId = 1;
    }
    addTodo(task) {
        const newTodo = {
            id: this.nextId++,
            task: task,
            completed: false
        };
        this.todos.push(newTodo);
    }
    completeTodo(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = true;
        }
        else {
            throw new Error(`Todo with id ${id} not found`);
        }
    }
    removeTodo(id) {
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
            this.todos.splice(index, 1);
        }
        else {
            throw new Error(`Todo with id ${id} not found`);
        }
    }
    listTodos() {
        return this.todos;
    }
    filterTodos(completed) {
        return this.todos.filter(todo => todo.completed === completed);
    }
    updateTodoTask(id, newTask) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.task = newTask;
        }
        else {
            throw new Error(`Todo with id ${id} not found`);
        }
    }
    clearCompletedTodos() {
        this.todos = this.todos.filter(todo => !todo.completed);
    }
}
exports.TodoList = TodoList;
const todoList = new TodoList();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function showMenu() {
    console.log(`
    1. Add Todo
    2. Complete Todo
    3. Remove Todo
    4. List Todos
    5. Filter Todos
    6. Update Todo Task
    7. Clear Completed Todos
    8. Exit
    `);
}
function handleUserInput(input) {
    switch (input.trim()) {
        case '1':
            rl.question('Enter task: ', (task) => {
                todoList.addTodo(task);
                console.log('Todo added.');
                showMenu();
            });
            break;
        case '2':
            rl.question('Enter todo ID to complete: ', (id) => {
                try {
                    todoList.completeTodo(parseInt(id));
                    console.log('Todo completed.');
                }
                catch (error) {
                    if (error instanceof Error) {
                        console.error(error.message);
                    }
                }
                showMenu();
            });
            break;
        case '3':
            rl.question('Enter todo ID to remove: ', (id) => {
                try {
                    todoList.removeTodo(parseInt(id));
                    console.log('Todo removed.');
                }
                catch (error) {
                    if (error instanceof Error) {
                        console.error(error.message);
                    }
                }
                showMenu();
            });
            break;
        case '4':
            console.log('All Todos:', todoList.listTodos());
            showMenu();
            break;
        case '5':
            rl.question('Filter by completed status (true/false): ', (status) => {
                const completed = status.toLowerCase() === 'true';
                console.log('Filtered Todos:', todoList.filterTodos(completed));
                showMenu();
            });
            break;
        case '6':
            rl.question('Enter todo ID to update: ', (id) => {
                rl.question('Enter new task: ', (newTask) => {
                    try {
                        todoList.updateTodoTask(parseInt(id), newTask);
                        console.log('Todo updated.');
                    }
                    catch (error) {
                        if (error instanceof Error) {
                            console.error(error.message);
                        }
                    }
                    showMenu();
                });
            });
            break;
        case '7':
            todoList.clearCompletedTodos();
            console.log('Completed todos cleared.');
            showMenu();
            break;
        case '8':
            rl.close();
            break;
        default:
            console.log('Invalid option.');
            showMenu();
            break;
    }
}
rl.on('line', handleUserInput);
showMenu();
