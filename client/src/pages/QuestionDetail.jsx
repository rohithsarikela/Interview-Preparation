import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/apiClient";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const QuestionDetail = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [voteLoading, setVoteLoading] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  const fetchQuestion = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/api/questions/${id}`);
      setQuestion(data);
    } catch {
      toast.error("Failed to load question");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [id]);

  const handleVote = async (value) => {
    setVoteLoading(true);
    try {
      const { data } = await api.post(`/api/questions/${id}/vote`, { value });
      setQuestion((prev) => ({
        ...prev,
        upvotes: data.upvotes,
        downvotes: data.downvotes
      }));
    } catch {
      toast.error("Failed to vote");
    } finally {
      setVoteLoading(false);
    }
  };

  const handleBookmark = async () => {
    setBookmarkLoading(true);
    try {
      await api.post(`/api/questions/${id}/bookmark`);
      toast.success("Bookmarked");
    } catch {
      toast.error("Failed to bookmark");
    } finally {
      setBookmarkLoading(false);
    }
  };

  const handleSubmitSession = async (status) => {
    try {
      await api.post(`/api/questions/${id}/submit-session`, {
        status,
        timeTaken: 0,
        notes: ""
      });
      toast.success("Session saved");
    } catch {
      toast.error("Failed to save session");
    }
  };

  if (loading || !question) return <Loader />;

  const score = (question.upvotes || 0) - (question.downvotes || 0);

  return (
    <div className="main-content">
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <h2>{question.title}</h2>
            <p style={{ opacity: 0.7, fontSize: "0.9rem", marginTop: "0.25rem" }}>
              {question.category} · {question.difficulty}
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: "0.85rem" }}>Score: {score}</p>
            <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.25rem" }}>
              <button
                className="btn btn-secondary"
                disabled={voteLoading}
                onClick={() => handleVote(1)}
              >
                Upvote
              </button>
              <button
                className="btn btn-secondary"
                disabled={voteLoading}
                onClick={() => handleVote(-1)}
              >
                Downvote
              </button>
            </div>
          </div>
        </div>

        <p style={{ marginTop: "1rem", whiteSpace: "pre-wrap" }}>
          {question.description}
        </p>

        {question.hints?.length > 0 && (
          <div style={{ marginTop: "1rem" }}>
            <h4>Hints</h4>
            <ul style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
              {question.hints.map((h, i) => (
                <li key={i}>• {h}</li>
              ))}
            </ul>
          </div>
        )}

        {question.examples?.length > 0 && (
          <div style={{ marginTop: "1rem" }}>
            <h4>Examples</h4>
            {question.examples.map((ex, i) => (
              <div
                key={i}
                style={{
                  marginTop: "0.5rem",
                  padding: "0.5rem",
                  borderRadius: "0.5rem",
                  background: "#020617"
                }}
              >
                <p style={{ fontSize: "0.85rem" }}>Input: {ex.input}</p>
                <p style={{ fontSize: "0.85rem" }}>Output: {ex.output}</p>
                {ex.explanation && (
                  <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>
                    {ex.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {question.solution && (
          <div style={{ marginTop: "1rem" }}>
            <h4>Solution Discussion</h4>
            <p style={{ marginTop: "0.5rem", fontSize: "0.9rem", opacity: 0.9, whiteSpace: "pre-wrap" }}>
              {question.solution}
            </p>
          </div>
        )}

        <div
          style={{
            marginTop: "1.25rem",
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap"
          }}
        >
          <button
            className="btn"
            disabled={bookmarkLoading}
            onClick={handleBookmark}
          >
            Bookmark
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSubmitSession("attempted")}
          >
            Mark Attempted
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSubmitSession("solved")}
          >
            Mark Solved
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;
