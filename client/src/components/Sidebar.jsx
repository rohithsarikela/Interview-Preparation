import React from 'react';

export default function Sidebar() {
	return (
		<div className="sidebar">
			<h4>Question Bank</h4>
			<ul className="sidebar-list" style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
				<li>All Questions</li>
				<li>My Questions</li>
				<li>Bookmarks</li>
			</ul>
			<button className="btn-create">+ Create New</button>
			<div style={{ marginTop: 12 }}>
				<strong>Difficulty</strong>
				<div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
					<button className="btn btn-secondary">Easy</button>
					<button className="btn btn-secondary">Medium</button>
					<button className="btn btn-secondary">Hard</button>
				</div>
			</div>
		</div>
	);
}
