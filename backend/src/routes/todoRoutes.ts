import { Router } from 'express';
import Todo from '../models/Todo';

const router = Router();

// Create a new todo
router.post('/', async (req, res) => {
  const { title } = req.body;
  const newTodo = new Todo({
    title,
  });
  await newTodo.save();
  res.json(newTodo);
});

// Read all todos
router.get('/', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Update a todo
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const updatedTodo = await Todo.findByIdAndUpdate(
    id,
    { title, completed },
    { new: true }
  );
  res.json(updatedTodo);
});

// Delete a todo
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.json({ message: 'Todo deleted' });
});

export default router;
