import { useEffect, useState } from "react";
import api from "../api/apiClient";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import QuestionCard from "../components/QuestionCard";

const Profile = () => {
  const [progress, setProgress] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProfileData = async () => {
    setLoading(true);
    try {
      const [{ data: progressData }, { data: bookmarksData }] =
        await Promise.all([
          api.get("/api/users/progress"),
          api.get("/api/users/bookmarks")
        ]);
      setProgress(progressData);
      setBookmarks(bookmarksData);
    } catch {
      toast.error("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  if (loading || !progress) return <Loader />;

  return (
    <div className="main-content">
      <div className="grid">
        <div className="card">
          <h2>Your Progress</h2>
          <p style={{ marginTop: "0.5rem", fontSize: "0.9rem", opacity: 0.9 }}>
            Total Attempts: {progress.totalAttempts} <br />
            Total Solved: {progress.totalSolved}
          </p>

          <h3 style={{ marginTop: "1rem" }}>By Topic</h3>
          <div style={{ marginTop: "0.5rem", display: "grid", gap: "0.5rem" }}>
            {Object.entries(progress.perTopic).map(([topic, stats]) => (
              <div
                key={topic}
                style={{
                  padding: "0.6rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #1f2937"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>{topic}</span>
                  <span style={{ fontSize: "0.85rem", opacity: 0.8 }}>
                    {stats.solved}/{stats.attempts} solved
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2>Bookmarked Questions</h2>
          <div style={{ marginTop: "0.75rem" }}>
            {bookmarks.length === 0 ? (
              <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>
                No bookmarks yet. Save tricky questions while practicing.
              </p>
            ) : (
              <div className="grid">
                {bookmarks.map((q) => (
                  <QuestionCard key={q._id} question={q} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
