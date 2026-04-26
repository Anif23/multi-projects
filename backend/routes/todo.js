import { todoController } from "../controller/todo/todo.js";
import { authMiddleware } from "../middleware/auth.js";

export const todoRoutes = (app) => {
    app.get('/todos', authMiddleware, todoController.getTodos);
    app.post('/todos', authMiddleware, todoController.createTodo);
    app.put('/todos/:id', authMiddleware, todoController.updateTodo);
    app.delete('/todos/:id', authMiddleware, todoController.deleteTodo);
};