import React, { useState } from 'react';

function TodoItem({ todo, onDelete, onEdit, onUpdate }) {
  const [editText, setEditText] = useState(todo.text);

  return (
    <div className="todo-item">
      {todo.isEditing ? (
        <>
          <input
            value={editText}
            onChange={e => setEditText(e.target.value)}
          />
          <button onClick={() => onUpdate(todo.id, editText)}>✔️</button>
        </>
      ) : (
        <>
          <span>{todo.text}</span>
          <span className="icons">
            <span onClick={() => onEdit(todo.id)}>📝</span>
            <span onClick={() => onDelete(todo.id)}>🗑️</span>
          </span>
        </>
      )}
    </div>
  );
}

export default TodoItem;
