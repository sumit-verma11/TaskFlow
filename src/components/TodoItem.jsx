import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { HiCheck, HiTrash } from 'react-icons/hi';
import { HiCalendarDays } from 'react-icons/hi2';

function TodoItem({ todo, onToggle, onDelete }) {
    const isOverdue = todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date(new Date().toDateString());
    const cardRef = useRef(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const formatDate = (dateStr) => {
        if (!dateStr) return null;
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Tilt intensity -10 to 10 deg
        const rY = ((x / rect.width) - 0.5) * 20;
        const rX = ((y / rect.height) - 0.5) * -20;

        setRotateX(rX);
        setRotateY(rY);
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
        setIsHovered(false);
        setRotateX(0);
        setRotateY(0);
    };

    const handleToggle = (id) => {
        if (!todo.completed) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 1500);
        }
        onToggle(id);
    };

    // Edge color mapping
    const getEdgeColor = () => {
        if (todo.priority === 'High') return 'var(--priority-high)';
        if (todo.priority === 'Medium') return 'var(--priority-medium)';
        return 'var(--priority-low)';
    };

    // Stagger animation variant
    const itemVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.9, rotateX: -20 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            transition: { type: 'spring', bounce: 0.4, duration: 0.6 }
        },
        exit: { opacity: 0, x: -100, scale: 0.8, rotateZ: -10, transition: { duration: 0.3 } }
    };

    return (
        <div style={{ perspective: '1200px', display: 'block', width: '100%' }}>
            <motion.div
                ref={cardRef}
                layout
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`todo-item ${todo.completed ? 'completed' : ''}`}
                id={`todo-${todo.id}`}
                style={{
                    transform: isHovered
                        ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`
                        : 'rotateX(0deg) rotateY(0deg) translateZ(0px)',
                    transition: isHovered ? 'none' : 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
            >
                <div
                    className="todo-edge"
                    style={{ backgroundColor: getEdgeColor(), color: getEdgeColor() }}
                />

                <label>
                    <input
                        type="checkbox"
                        className="todo-checkbox"
                        checked={todo.completed}
                        onChange={() => handleToggle(todo.id)}
                        id={`checkbox-${todo.id}`}
                    />
                    <span className="checkbox-custom">
                        <HiCheck className="check-icon" />
                    </span>
                    {/* Confetti Explosion */}
                    {showConfetti && (
                        <motion.div
                            className="absolute z-50 text-2xl -top-4 -left-4 pointer-events-none"
                            initial={{ scale: 0, y: 0, rotate: 0 }}
                            animate={{ scale: [0, 1.5, 0], y: -50, rotate: [0, 180, 360] }}
                            transition={{ duration: 0.8 }}
                            style={{ position: 'absolute' }}
                        >
                            🎉
                        </motion.div>
                    )}
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
                                <HiCalendarDays size={14} />
                                {formatDate(todo.dueDate)}
                            </span>
                        )}
                    </div>
                </div>

                <button
                    className="btn-delete"
                    onClick={(e) => {
                        e.stopPropagation(); // prevent click from affecting card
                        onDelete(todo.id);
                    }}
                    id={`delete-${todo.id}`}
                    aria-label="Delete task"
                >
                    <HiTrash />
                </button>
            </motion.div>
        </div>
    );
}

export default TodoItem;
