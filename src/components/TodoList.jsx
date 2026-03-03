import { AnimatePresence, motion } from 'framer-motion';
import TodoItem from './TodoItem';

function TodoList({ todos, onToggle, onDelete }) {
    if (todos.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ type: 'spring', bounce: 0.5 }}
                className="empty-state"
                id="empty-state"
            >
                <div className="empty-icon">👻</div>
                <h3 className="empty-title">Ghost town...</h3>
                <p className="empty-subtitle">Time to lock in and add some tasks! No cap.</p>
            </motion.div>
        );
    }

    // Stagger container variant
    const listVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    };

    return (
        <div id="todo-list">
            <motion.div
                variants={listVariants}
                initial="hidden"
                animate="visible"
                className="todo-list-container space-y-4" // Use Flex config from index.css instead
            >
                <AnimatePresence mode="popLayout">
                    {todos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={onToggle}
                            onDelete={onDelete}
                        />
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}

export default TodoList;
