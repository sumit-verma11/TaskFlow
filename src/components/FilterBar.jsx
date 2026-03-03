import { motion } from 'framer-motion';

function FilterBar({ filter, setFilter, total, completed, onClearCompleted }) {
    const filters = ['All', 'Active', 'Completed'];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="filter-bar"
            id="filter-bar"
        >
            <div className="filter-pills">
                {filters.map((f) => (
                    <button
                        key={f}
                        className={`filter-pill ${filter === f ? 'active' : ''}`}
                        onClick={() => setFilter(f)}
                        id={`filter-${f.toLowerCase()}`}
                    >
                        {f}
                        <span className="filter-count">
                            {f === 'All' && total}
                            {f === 'Active' && (total - completed)}
                            {f === 'Completed' && completed}
                        </span>
                    </button>
                ))}
            </div>

            <button
                className="btn-clear"
                onClick={onClearCompleted}
                id="btn-clear-completed"
            >
                {completed > 0 ? `Nuke completed (${completed}) 💥` : 'Nothing to nuke 💥'}
            </button>
        </motion.div>
    );
}

export default FilterBar;
