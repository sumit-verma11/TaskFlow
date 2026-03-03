import { useState } from 'react';
import { HiPlus } from 'react-icons/hi';
import { motion } from 'framer-motion';

const CATEGORIES = [
  { value: 'Personal', icon: '💆‍♀️' },
  { value: 'Work', icon: '💼' },
  { value: 'Health', icon: '🥗' },
  { value: 'Shopping', icon: '🛒' },
  { value: 'Other', icon: '✨' }
];

const PRIORITIES = [
  { value: 'Low', icon: '🟢' },
  { value: 'Medium', icon: '🟡' },
  { value: 'High', icon: '🔴' }
];

function AddTodo({ onAdd }) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [category, setCategory] = useState('Personal');
  // for gentle 3D hover tilt on the card itself, not just CSS
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

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

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate rotation (-5 to 5 degrees)
    const rY = ((x / rect.width) - 0.5) * 10;
    const rX = ((y / rect.height) - 0.5) * -10;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.form
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
      className="add-todo-card"
      onSubmit={handleSubmit}
      id="add-todo-form"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.1s ease-out', // overridden by inline style while moving
      }}
    >
      <input
        id="todo-input"
        type="text"
        className="input-main"
        placeholder="Drop a new task... no cap 🧢"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoComplete="off"
      />

      <div className="form-row">
        <div className="form-field">
          <span className="form-label">Priority</span>
          <select
            id="priority-select"
            className="form-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            {PRIORITIES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.icon} {p.value}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <span className="form-label">Vibe check</span>
          <select
            id="category-select"
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.icon} {c.value}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <span className="form-label">Deadline</span>
          <input
            id="date-input"
            type="date"
            className="form-date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>

      <button type="submit" className="btn-add" id="btn-add-task">
        <HiPlus size={20} />
        Let's Go
      </button>
    </motion.form>
  );
}

export default AddTodo;