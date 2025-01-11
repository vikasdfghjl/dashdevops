import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

interface Todo {
  _id: string;
  title: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string>('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get('/api/todos');
    setTodos(response.data);
  };

  const addTodo = async () => {
    const response = await axios.post('/api/todos', { title: newTodo });
    setTodos([...todos, response.data]);
    setNewTodo('');
  };

  const updateTodo = async (id: string, completed: boolean) => {
    const response = await axios.put(`/api/todos/${id}`, { completed });
    setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
  };

  const startEditing = (todo: Todo) => {
    setEditingTodoId(todo._id);
    setEditTitle(todo.title);
  };

  const saveTodo = async (id: string) => {
    const response = await axios.put(`/api/todos/${id}`, { title: editTitle });
    setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
    setEditingTodoId(null);
    setEditTitle('');
  };

  const deleteTodo = async (id: string) => {
    await axios.delete(`/api/todos/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  return (
    <div>
      <h1>Todo App</h1>
      <label htmlFor="new-todo">New Todo:</label>
      <input
        id="new-todo"
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter a new todo"
        aria-label="New Todo"
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li key={todo._id} className={todo.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => updateTodo(todo._id, !todo.completed)}
              aria-label={`Mark ${todo.title} as ${todo.completed ? 'incomplete' : 'complete'}`}
            />
            {editingTodoId === todo._id ? (
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onBlur={() => saveTodo(todo._id)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    saveTodo(todo._id);
                  }
                }}
                autoFocus
              />
            ) : (
              <span onDoubleClick={() => startEditing(todo)}>{todo.title}</span>
            )}
            <button onClick={() => startEditing(todo)}>Edit</button>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
