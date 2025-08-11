import express from 'express';
import { authenticateToken } from '../middleware/addMiddleware.ts';
import {
  getTodosByUserId,
  createTodo,
  findTodoByIdAndUserId,
  toggleTodoCompleted,
  deleteTodoById,
} from '../models/todoModel.ts';

const router = express.Router();

router.get('/todos', authenticateToken, async (req, res) => {
  try {
    const userId = req.user!.userId;
    const todos = await getTodosByUserId(userId);
    res.json(todos);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/todos', authenticateToken, async (req, res) => {
  try {
    const { title } = req.body;
    const userId = req.user!.userId;
    if (!title) return res.status(400).json({ error: 'Введите название задачи' });

    const newTodo = await createTodo(title, userId);
    res.status(201).json(newTodo);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/todos/:id', authenticateToken, async (req, res) => {
  try {
    const todoId = Number(req.params.id);
    const userId = req.user!.userId;

    const todo = await findTodoByIdAndUserId(todoId, userId);
    if (!todo) return res.status(404).json({ error: 'Задача не найдена' });

    const newStatus = todo.completed ? 0 : 1;
    await toggleTodoCompleted(todoId, newStatus);

    res.json({ ...todo, completed: newStatus });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/todos/:id', authenticateToken, async (req, res) => {
  try {
    const todoId = Number(req.params.id);
    const userId = req.user!.userId;

    const todo = await findTodoByIdAndUserId(todoId, userId);
    if (!todo) return res.status(404).json({ error: 'Задача не найдена' });

    await deleteTodoById(todoId);
    res.json({ message: 'Задача удалена' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
