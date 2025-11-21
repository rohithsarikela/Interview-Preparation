import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import api from "../api/apiClient";

const Dashboard = () => {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    streak: 0,
    longestStreak: 0,
    easySolved: 0,
    hardSolved: 0,
    recentActivity: [],
    recommended: null
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/dashboard/stats");
        setStats(res.data);
      } catch (err) {
        console.log("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="main-content">Loading...</div>;
  }

  return (
    <div className="main-content dashboard dashboard-dark">

      {/* TOP ROW */}
      <div className="top-row">
        <section className="dashboard-card dark-card welcome-card">
          <div className="welcome-head">
            <h2>Welcome back, {user?.name}</h2>
            <p className="muted">
              Plan your interview prep: bank, daily challenge, and mock sessions.
            </p>
          </div>

          <div className="action-row">
            <Link to="/questions" className="btn green">Question Bank</Link>
            <Link to="/daily" className="btn blue">Daily Challenge</Link>
            <Link to="/mock" className="btn purple">Mock Interview</Link>
          </div>
        </section>

        {/* Streak Card */}
        <aside className="dashboard-card dark-card streak-card">
          <h4>Streak</h4>
          <div className="streak-body">
            <div className="streak-icon">🔥</div>
            <div className="streak-info">
              <div className="streak-current">Current Streak:</div>
              <div className="streak-days">{stats.streak} Days</div>
              <div className="streak-long">Longest: {stats.longestStreak} Days</div>
            </div>

            <label className="switch">
              <input type="checkbox" />
              <span className="slider" />
            </label>
          </div>
        </aside>
      </div>

      {/* MID ROW */}
      <div className="mid-row">
        <section className="dashboard-card dark-card recent-activity">
          <h3>Recent Activity</h3>

          {stats.recentActivity.length === 0 ? (
            <div className="empty">No recent activity yet.</div>
          ) : (
            stats.recentActivity.map((item, idx) => (
              <div key={idx}>{item}</div>
            ))
          )}
        </section>

        {/* Progress Section */}
        <section className="dashboard-card dark-card progress-card">
          <h3>Your Progress At A Glance</h3>
          <p className="muted">
            Solve an Easy Array problem — Recommended: {stats.recommended}
          </p>

          <div className="progress-row">
            {/* EASY */}
            <div className="progress-circle">
              <svg viewBox="0 0 36 36">
                <path
                  className="bg"
                  d="M18 2.0845a15.9155 15.9155 0 1 0 0 31.831a15.9155 15.9155 0 1 0 0-31.831"
                />
                <path
                  className="progress"
                  strokeDasharray={`${stats.easySolved},100`}
                  d="M18 2.0845a15.9155 15.9155 0 1 0 0 31.831a15.9155 15.9155 0 1 0 0-31.831"
                />
                <text x="18" y="20.35" className="percentage">
                  {stats.easySolved}%
                </text>
              </svg>
              <div className="label">Solved Easy Questions</div>
            </div>

            {/* HARD */}
            <div className="progress-circle">
              <svg viewBox="0 0 36 36">
                <path
                  className="bg"
                  d="M18 2.0845a15.9155 15.9155 0 1 0 0 31.831a15.9155 15.9155 0 1 0 0-31.831"
                />
                <path
                  className="progress orange"
                  strokeDasharray={`${stats.hardSolved},100`}
                  d="M18 2.0845a15.9155 15.9155 0 1 0 0 31.831a15.9155 15.9155 0 1 0 0-31.831"
                />
                <text x="18" y="20.35" className="percentage">
                  {stats.hardSolved}%
                </text>
              </svg>
              <div className="label">Solved Hard Questions</div>
            </div>
          </div>

          <div style={{ marginTop: 12 }}>
            <button className="btn blue">Open Question</button>
          </div>
        </section>
      </div>

      {/* BOTTOM ROW */}
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
