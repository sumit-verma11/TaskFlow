import { motion } from 'framer-motion';
import { HiCheck, HiTrash } from 'react-icons/hi';
import { HiCalendarDays } from 'react-icons/hi2';

function TodoItem({ todo, onToggle, onDelete }) {
    const isOverdue = todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date(new Date().toDateString());

    const formatDate = (dateStr) => {
        if (!dateStr) return null;
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: -80, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className={`todo-item ${todo.completed ? 'completed' : ''}`}
            id={`todo-${todo.id}`}
        >
            <label>
                <input
                    type="checkbox"
                    className="todo-checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                    id={`checkbox-${todo.id}`}
                />
                <span className="checkbox-custom">
                    <HiCheck className="check-icon" />
                </span>
            </label>

            <div className="todo-content">
                <div className="todo-title">{todo.title}</div>
                <div className="todo-meta">
                    <span className={`todo-badge badge-priority-${todo.priority.toLowerCase()}`}>
                        {todo.priority}
                    </span>
                    <span className={`badge-category ${todo.category.toLowerCase()}`}>
                        {todo.category}
                    </span>
                    {todo.dueDate && (
                        <span className={`todo-date ${isOverdue ? 'overdue' : ''}`}>
                            <HiCalendarDays size={12} />
                            {formatDate(todo.dueDate)}
                        </span>
                    )}
                </div>
            </div>

            <button
                className="btn-delete"
                onClick={() => onDelete(todo.id)}
                id={`delete-${todo.id}`}
                aria-label="Delete task"
            >
                <HiTrash />
            </button>
        </motion.div>
    );
}

export default TodoItem;
