import { Link } from "react-router-dom";

const QuestionCard = ({ question }) => {
  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>{question.title}</h3>
        <span
          style={{
            padding: "0.2rem 0.6rem",
            borderRadius: "999px",
            fontSize: "0.75rem",
            background:
              question.difficulty === "Easy"
                ? "#15803d33"
                : question.difficulty === "Medium"
                ? "#ea580c33"
                : "#b91c1c33"
          }}
        >
          {question.difficulty}
        </span>
      </div>

      <p style={{ marginTop: "0.25rem", fontSize: "0.85rem", opacity: 0.8 }}>
        {question.category}
      </p>

      {question.tags?.length > 0 && (
        <div style={{ marginTop: "0.5rem", display: "flex", flexWrap: "wrap", gap: "0.25rem" }}>
          {question.tags.map((t) => (
            <span
              key={t}
              style={{
                fontSize: "0.75rem",
                padding: "0.15rem 0.5rem",
                borderRadius: "999px",
                border: "1px solid #1f2937"
              }}
            >
              {t}
            </span>
          ))}
        </div>
      )}

      <div style={{ marginTop: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "0.8rem", opacity: 0.7 }}>
          Score: {(question.upvotes || 0) - (question.downvotes || 0)}
        </span>
        <Link to={`/questions/${question._id}`} className="btn btn-secondary">
          View
        </Link>
      </div>
    </div>
  );
};

export default QuestionCard;
