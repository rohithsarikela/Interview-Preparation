import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="main-content">
      <div className="grid grid-cols-2">
        <div className="card">
          <h2>Welcome back, {user?.name}</h2>
          <p style={{ marginTop: "0.5rem", opacity: 0.8 }}>
            Plan your interview prep: bank, daily challenge, and mock sessions.
          </p>
          <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <Link to="/questions" className="btn">
              Question Bank
            </Link>
            <Link to="/daily" className="btn btn-secondary">
              Daily Challenge
            </Link>
            <Link to="/mock" className="btn btn-secondary">
              Mock Interview
            </Link>
          </div>
        </div>
        <div className="card">
          <h3>Tips</h3>
          <ul style={{ marginTop: "0.75rem", fontSize: "0.9rem", opacity: 0.9 }}>
            <li>• Solve at least one daily challenge.</li>
            <li>• Use mock mode with a timer to simulate pressure.</li>
            <li>• Bookmark tricky questions for revision.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
