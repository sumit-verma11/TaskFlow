import { AnimatePresence } from 'framer-motion';
import TodoItem from './TodoItem';

function TodoList({ todos, onToggle, onDelete }) {
    if (todos.length === 0) {
        return (
            <div className="empty-state" id="empty-state">
                <div className="empty-icon">📋</div>
                <h3 className="empty-title">No tasks here</h3>
                <p className="empty-subtitle">Add a task above to get started!</p>
            </div>
        );
    }

    return (
        <div id="todo-list">
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
        </div>
    );
}

export default TodoList;
