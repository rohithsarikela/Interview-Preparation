import { useEffect, useState } from "react";
import api from "../api/apiClient";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const MockInterview = () => {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(30 * 60); // 30 mins
  const [running, setRunning] = useState(false);

  const fetchRandomQuestion = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/api/questions");
      if (data.length === 0) {
        toast.error("No questions available");
        return;
      }
      const idx = Math.floor(Math.random() * data.length);
      setQuestion(data[idx]);
      setSecondsLeft(30 * 60);
      setRunning(false);
    } catch {
      toast.error("Failed to load question");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomQuestion();
  }, []);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(interval);
          toast("Time up! Wrap your answer.");
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [running]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (loading || !question) return <Loader />;

  return (
    <div className="main-content">
      <div className="card">
        <h2>Mock Interview Mode</h2>
        <p style={{ marginTop: "0.5rem", opacity: 0.8 }}>
          Read the question silently. Start the timer and answer as if in a real
          interview.
        </p>

        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div>
            <h3>{question.title}</h3>
            <p
              style={{
                fontSize: "0.9rem",
                opacity: 0.8,
                marginTop: "0.25rem"
              }}
            >
              {question.category} · {question.difficulty}
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: "1.3rem",
                padding: "0.35rem 0.75rem",
                borderRadius: "999px",
                border: "1px solid #1f2937"
              }}
            >
              {formatTime(secondsLeft)}
            </div>
            <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.35rem" }}>
              <button
                className="btn btn-secondary"
                onClick={() => setRunning((r) => !r)}
              >
                {running ? "Pause" : "Start"}
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setRunning(false);
                  setSecondsLeft(30 * 60);
                }}
              >
                Reset
              </button>
              <button className="btn" onClick={fetchRandomQuestion}>
                New Question
              </button>
            </div>
          </div>
        </div>

        <p style={{ marginTop: "0.75rem", whiteSpace: "pre-wrap" }}>
          {question.description}
        </p>
      </div>
    </div>
  );
};

export default MockInterview;
