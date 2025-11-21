import { useEffect, useState } from "react";
import api from "../api/apiClient";
import QuestionCard from "../components/QuestionCard";
import QuestionPageLayout from "../components/QuestionPageLayout";
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
      <div style={{ marginTop: "1rem" }}>
        {loading ? (
          <Loader />
        ) : (
          <QuestionPageLayout
            questions={questions}
            filters={filters}
            onFilterChange={handleFilterChange}
            onApplyFilters={handleApplyFilters}
          />
        )}
      </div>
    </div>
  );
};

export default QuestionBank;
