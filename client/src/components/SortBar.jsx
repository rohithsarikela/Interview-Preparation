// src/components/SortBar.jsx
import React from 'react';

export default function SortBar({ filters = {}, onChange = () => {}, onApply = () => {} }) {
  return (
    <form className="sort-bar" onSubmit={(e) => { e.preventDefault(); onApply(e); }}>
      <div className="search-wrap">
        <input
          className="search-input"
          placeholder="Search by title..."
          name="search"
          value={filters.search || ''}
          onChange={onChange}
        />
      </div>

      <div className="sort-controls">
        <div className="filters">
          <select className="select-small" name="difficulty" value={filters.difficulty || ''} onChange={onChange}>
            <option value="">All Difficulties</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          <select className="select-small" name="category" value={filters.category || ''} onChange={onChange}>
            <option value="">Category (e.g. Arrays)</option>
          </select>
        </div>

        <button className="btn-apply" type="submit">Apply</button>
      </div>
    </form>
  );
}
