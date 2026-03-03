import { useState, useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import FilterBar from './components/FilterBar';

const STORAGE_KEY = 'taskflow-todos';

function loadTodos() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning! 🌅';
  if (hour < 18) return 'Good afternoon! ☀️';
  return 'Good evening! 🌙';
}

function App() {
  const [todos, setTodos] = useState(loadTodos);
  const [filter, setFilter] = useState('All');
  const greeting = getGreeting();

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = ({ title, dueDate, priority, category }) => {
    const newTodo = {
      id: uuidv4(),
      title,
      dueDate,
      priority,
      category,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  };

  const completedCount = todos.filter((t) => t.completed).length;
  const progressPercent = todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0;

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'Active':
        return todos.filter((t) => !t.completed);
      case 'Completed':
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  return (
    <div className="app-wrapper" id="app-wrapper">
      {/* Header */}
      <header className="app-header">
        <div className="greeting-text">{greeting}</div>
        <h1 className="app-logo">Taskflow</h1>
        <p className="app-tagline">crush your goals. touch grass later.</p>

        {/* 3D Stats Container */}
        <div className="stats-container">
          <div className="stats-row">
            <div className="stat-pill">
              <span>Vibes</span>
              <span className="stat-value">{todos.length}</span>
            </div>
            <div className="stat-pill">
              <span>W's</span>
              <span className="stat-value">{completedCount}</span>
            </div>
            <div className="stat-pill">
              <span>Grind</span>
              <span className="stat-value">{todos.length - completedCount}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {todos.length > 0 && (
          <div className="progress-container">
            <div className="progress-bar-wrapper">
              <div
                className="progress-bar-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="progress-label">
              <span>Main Quest</span>
              <span>{progressPercent === 100 ? 'Goated! 🐐' : `${progressPercent}% clear`}</span>
            </div>
          </div>
        )}
      </header>

      {/* Add Todo Form */}
      <div className="add-todo-container">
        <AddTodo onAdd={addTodo} />
      </div>

      {/* Filter Bar */}
      {todos.length > 0 && (
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          total={todos.length}
          completed={completedCount}
          onClearCompleted={clearCompleted}
        />
      )}

      {/* Todo List Container */}
      <div className="todo-list-container">
        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      </div>
    </div>
  );
}

export default App;
