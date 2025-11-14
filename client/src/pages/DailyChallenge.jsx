import { useEffect, useState } from "react";
import api from "../api/apiClient";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const DailyChallenge = () => {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reused, setReused] = useState(false);

  const fetchDaily = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/api/questions/daily/today");
      setQuestion(data.question);
      setReused(data.reused);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load daily");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDaily();
  }, []);

  if (loading || !question) return <Loader />;

  return (
    <div className="main-content">
      <div className="card">
        <h2>Daily Challenge</h2>
        {reused && (
          <p style={{ fontSize: "0.8rem", opacity: 0.7, marginTop: "0.25rem" }}>
            You already got this question today. Keep practicing!
          </p>
        )}
        <h3 style={{ marginTop: "1rem" }}>{question.title}</h3>
        <p style={{ opacity: 0.8, fontSize: "0.9rem", marginTop: "0.25rem" }}>
          {question.category} · {question.difficulty}
        </p>
        <p style={{ marginTop: "0.75rem" }}>{question.description}</p>
        <Link
          to={`/questions/${question._id}`}
          className="btn"
          style={{ marginTop: "1rem", display: "inline-block" }}
        >
          Open Full Question
        </Link>
      </div>
    </div>
  );
};

export default DailyChallenge;
