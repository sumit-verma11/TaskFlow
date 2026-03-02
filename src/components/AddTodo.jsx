import { useState } from 'react';
import { HiPlus } from 'react-icons/hi';

const CATEGORIES = ['Personal', 'Work', 'Health', 'Shopping', 'Other'];
const PRIORITIES = ['Low', 'Medium', 'High'];

function AddTodo({ onAdd }) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [category, setCategory] = useState('Personal');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      dueDate,
      priority,
      category,
    });

    setTitle('');
    setDueDate('');
    setPriority('Medium');
    setCategory('Personal');
  };

  return (
    <form className="add-todo-card" onSubmit={handleSubmit} id="add-todo-form">
      <input
        id="todo-input"
        type="text"
        className="input-main"
        placeholder="✨ What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoComplete="off"
      />

      <div className="form-row">
        <select
          id="priority-select"
          className="form-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {p === 'High' ? '🔴' : p === 'Medium' ? '🟡' : '🟢'} {p} Priority
            </option>
          ))}
        </select>

        <select
          id="category-select"
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <input
          id="date-input"
          type="date"
          className="form-date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <button type="submit" className="btn-add" id="btn-add-task">
        <HiPlus size={18} />
        Add Task
      </button>
    </form>
  );
}

export default AddTodo;