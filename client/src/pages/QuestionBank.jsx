import { useEffect, useState } from "react";
import api from "../api/apiClient";
import QuestionCard from "../components/QuestionCard";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const QuestionBank = () => {
  const [questions, setQuestions] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    difficulty: "",
    search: ""
  });
  const [loading, setLoading] = useState(false);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.category) params.category = filters.category;
      if (filters.difficulty) params.difficulty = filters.difficulty;
      if (filters.search) params.search = filters.search;
      const { data } = await api.get("/api/questions", { params });
      setQuestions(data);
    } catch (err) {
      toast.error("Failed to load questions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleFilterChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  const handleApplyFilters = (e) => {
    e.preventDefault();
    fetchQuestions();
  };

  return (
    <div className="main-content">
      <h2>Question Bank</h2>
      <form
        onSubmit={handleApplyFilters}
        style={{
          marginTop: "1rem",
          display: "grid",
          gap: "0.75rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))"
        }}
      >
        <input
          className="input"
          placeholder="Search by title..."
          name="search"
          value={filters.search}
          onChange={handleFilterChange}
        />
        <select
          className="input"
          name="difficulty"
          value={filters.difficulty}
          onChange={handleFilterChange}
        >
          <option value="">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <input
          className="input"
          placeholder="Category (e.g. Arrays)"
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
        />
        <button className="btn" type="submit">
          Apply
        </button>
      </form>

      <div style={{ marginTop: "1.25rem" }}>
        {loading ? (
          <Loader />
        ) : questions.length === 0 ? (
          <p style={{ opacity: 0.7 }}>No questions found.</p>
        ) : (
          <div className="grid">
            {questions.map((q) => (
              <QuestionCard key={q._id} question={q} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionBank;
