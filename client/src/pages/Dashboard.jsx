import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="main-content dashboard dashboard-dark">
      <div className="top-row">
        <section className="dashboard-card dark-card welcome-card">
          <div className="welcome-head">
            <h2>Welcome back, {user?.name}</h2>
            <p className="muted">Plan your interview prep: bank, daily challenge, and mock sessions.</p>
          </div>

          <div className="action-row">
            <Link to="/questions" className="btn green">
              Question Bank
            </Link>
            <Link to="/daily" className="btn blue">
              Daily Challenge
            </Link>
            <Link to="/mock" className="btn purple">
              Mock Interview
            </Link>
          </div>
        </section>

        <aside className="dashboard-card dark-card streak-card">
          <h4>Streak</h4>
          <div className="streak-body">
            <div className="streak-icon">🔥</div>
            <div className="streak-info">
              <div className="streak-current">Current Streak:</div>
              <div className="streak-days">0 Days</div>
              <div className="streak-long">Longest: 12 Days</div>
            </div>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider" />
            </label>
          </div>
        </aside>
      </div>

      <div className="mid-row">
        <section className="dashboard-card dark-card recent-activity">
          <h3>Recent Activity</h3>
          <div className="empty">No recent activity yet.</div>
        </section>

        <section className="dashboard-card dark-card progress-card">
          <h3>Your Progress At A Glance</h3>
          <p className="muted">Solve an Easy Array problem — Recommended: Two Sum</p>
          <div className="progress-row">
            <div className="progress-circle">
              <svg viewBox="0 0 36 36">
                <path className="bg" d="M18 2.0845a15.9155 15.9155 0 1 0 0 31.831a15.9155 15.9155 0 1 0 0-31.831"/>
                <path className="progress" strokeDasharray="75,100" d="M18 2.0845a15.9155 15.9155 0 1 0 0 31.831a15.9155 15.9155 0 1 0 0-31.831"/>
                <text x="18" y="20.35" className="percentage">75%</text>
              </svg>
              <div className="label">Solved Easy Questions</div>
            </div>

            <div className="progress-circle">
              <svg viewBox="0 0 36 36">
                <path className="bg" d="M18 2.0845a15.9155 15.9155 0 1 0 0 31.831a15.9155 15.9155 0 1 0 0-31.831"/>
                <path className="progress orange" strokeDasharray="30,100" d="M18 2.0845a15.9155 15.9155 0 1 0 0 31.831a15.9155 15.9155 0 1 0 0-31.831"/>
                <text x="18" y="20.35" className="percentage">30%</text>
              </svg>
              <div className="label">Solved Hard Questions</div>
            </div>
          </div>

          <div style={{ marginTop: 12 }}>
            <button className="btn blue">Open Question</button>
          </div>
        </section>
      </div>

      <div className="bottom-row">
        <section className="dashboard-card dark-card tips-card">
          <h3>Tips</h3>
          <ul className="tips-list">
            <li>Solve at least one daily challenge.</li>
            <li>Use mock mode with a timer to simulate pressure.</li>
            <li>Bookmark tricky questions for revision.</li>
          </ul>
        </section>

        <section className="dashboard-card dark-card reminders-card">
          <h3>Helpful Reminders</h3>
          <p className="muted">No reminders at the moment.</p>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
