function FilterBar({ filter, setFilter, total, completed, onClearCompleted }) {
    const filters = ['All', 'Active', 'Completed'];

    return (
        <div className="filter-bar" id="filter-bar">
            <div className="filter-pills">
                {filters.map((f) => (
                    <button
                        key={f}
                        className={`filter-pill ${filter === f ? 'active' : ''}`}
                        onClick={() => setFilter(f)}
                        id={`filter-${f.toLowerCase()}`}
                    >
                        {f}
                        {f === 'All' && ` (${total})`}
                        {f === 'Active' && ` (${total - completed})`}
                        {f === 'Completed' && ` (${completed})`}
                    </button>
                ))}
            </div>

            {completed > 0 && (
                <button
                    className="btn-clear"
                    onClick={onClearCompleted}
                    id="btn-clear-completed"
                >
                    Clear completed
                </button>
            )}
        </div>
    );
}

export default FilterBar;
