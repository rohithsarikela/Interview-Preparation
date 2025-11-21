import { Link } from "react-router-dom";

const QuestionCard = ({ question }) => {
  const difficultyClass = `difficulty-${(question.difficulty || '').toLowerCase()}`;

  return (
    <div className="card question-card">
      <div className="q-header">
        <h3 className="q-title">{question.title}</h3>
        <span className={`q-badge ${difficultyClass}`}>{question.difficulty}</span>
      </div>

      <p className="q-category">{question.category}</p>

      {question.tags?.length > 0 && (
        <div className="q-tags">
          {question.tags.map((t) => (
            <span key={t} className="q-tag">{t}</span>
          ))}
        </div>
      )}

      <div className="q-footer">
        <span className="q-score">Score: {(question.upvotes || 0) - (question.downvotes || 0)}</span>
        <Link to={`/questions/${question._id}`} className="btn btn-secondary">Details</Link>
        <Link to={`/solve/${question._id}`} className="btn btn">Solve</Link>

      </div>
    </div>
  );
};

export default QuestionCard;
