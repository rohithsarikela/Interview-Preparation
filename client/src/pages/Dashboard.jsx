import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="main-content dashboard">
      <div className="dashboard-grid">
        <section className="dashboard-card welcome-card">
          <h2>Welcome back, {user?.name}</h2>
          <p className="muted">Plan your interview prep: bank, daily challenge, and mock sessions.</p>

          <div className="action-row">
            <Link to="/questions" className="btn primary">
              Question Bank
            </Link>
            <Link to="/daily" className="btn">
              Daily Challenge
            </Link>
            <Link to="/mock" className="btn">
              Mock Interview
            </Link>
          </div>
        </section>

        <aside className="dashboard-card tips-card">
          <h3>Tips</h3>
          <ul className="tips-list">
            <li>Solve at least one daily challenge.</li>
            <li>Use mock mode with a timer to simulate pressure.</li>
            <li>Bookmark tricky questions for revision.</li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
