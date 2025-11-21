// src/components/QuestionPageLayout.jsx
import React from 'react';
import Sidebar from './Sidebar';
import SortBar from './SortBar';
import QuestionCard from './QuestionCard';

export default function QuestionPageLayout({ questions = [], filters = {}, onFilterChange, onApplyFilters }) {
  return (
    <div className="q-container">
      {/* Left sidebar */}
      <aside className="q-left">
        <Sidebar />
      </aside>

      {/* Middle column: sort bar + list */}
      <main className="q-middle">
        <SortBar filters={filters} onChange={onFilterChange} onApply={onApplyFilters} />
        <div className="q-list">
          {questions.length === 0 ? (
            <div className="empty">No questions found</div>
          ) : (
            questions.map(q => <QuestionCard key={q._id} question={q} />)
          )}
        </div>
      </main>

      {/* Right column for spacing / future widgets */}
      <aside className="q-right">
        {/* Leave empty or add bookmarks / tag cloud later */}
      </aside>
    </div>
  );
}
