import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todoList");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;
    const newTodo = {
      id: Date.now(),
      text: input,
      isEditing: false
    };
    setTodos([...todos, newTodo]);
    setInput('');
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleEdit = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
    ));
  };

  const updateTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText, isEditing: false } : todo
    ));
  };

  return (
    <div className="app">
      <h1>📝 To-Do List</h1>
      <div className="input-group">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Write a task..."
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <div className="todo-list">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={deleteTodo}
            onEdit={toggleEdit}
            onUpdate={updateTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

