import * as readline from 'readline';

export interface TodoItem {
    id: number;
    task: string;
    completed: boolean;
}

export class TodoList {
    private todos: TodoItem[] = [];
    private nextId: number = 1;

    addTodo(task: string): void {
        const newTodo: TodoItem = {
            id: this.nextId++,
            task: task,
            completed: false
        };
        this.todos.push(newTodo);
    }

    completeTodo(id: number): void {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = true;
        } else {
            throw new Error(`Todo with id ${id} not found`);
        }
    }

    removeTodo(id: number): void {
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
            this.todos.splice(index, 1);
        } else {
            throw new Error(`Todo with id ${id} not found`);
        }
    }

    listTodos(): TodoItem[] {
        return this.todos;
    }

    filterTodos(completed: boolean): TodoItem[] {
        return this.todos.filter(todo => todo.completed === completed);
    }

    updateTodoTask(id: number, newTask: string): void {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.task = newTask;
        } else {
            throw new Error(`Todo with id ${id} not found`);
        }
    }

    clearCompletedTodos(): void {
        this.todos = this.todos.filter(todo => !todo.completed);
    }
}

const todoList = new TodoList();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function showMenu(): void {
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

function handleUserInput(input: string): void {
    switch (input.trim()) {
        case '1':
            rl.question('Enter task: ', (task: string) => {
                todoList.addTodo(task);
                console.log('Todo added.');
                showMenu();
            });
            break;
        case '2':
            rl.question('Enter todo ID to complete: ', (id: string) => {
                try {
                    todoList.completeTodo(parseInt(id));
                    console.log('Todo completed.');
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        console.error(error.message);
                    }
                }
                showMenu();
            });
            break;
        case '3':
            rl.question('Enter todo ID to remove: ', (id: string) => {
                try {
                    todoList.removeTodo(parseInt(id));
                    console.log('Todo removed.');
                } catch (error: unknown) {
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
            rl.question('Filter by completed status (true/false): ', (status: string) => {
                const completed = status.toLowerCase() === 'true';
                console.log('Filtered Todos:', todoList.filterTodos(completed));
                showMenu();
            });
            break;
        case '6':
            rl.question('Enter todo ID to update: ', (id: string) => {
                rl.question('Enter new task: ', (newTask: string) => {
                    try {
                        todoList.updateTodoTask(parseInt(id), newTask);
                        console.log('Todo updated.');
                    } catch (error: unknown) {
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