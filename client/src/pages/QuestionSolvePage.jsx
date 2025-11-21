import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/apiClient";

export default function QuestionSolvePage() {
  const { id } = useParams();

  const [question, setQuestion] = useState(null);
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const starterTemplates = {
    python: "# Write your solution here\n",
    javascript: "// Write your solution here\n",
    java: "class Solution { public static void main(String[] args) {} }",
    c: "#include <stdio.h>\nint main() { return 0; }"
  };

  // 🔥 FIXED: GET QUESTION USING /api/questions
  useEffect(() => {
    api
      .get(`/api/questions/${id}`)
      .then((res) => {
        if (!res.data) {
          console.error("No question returned");
        }
        setQuestion(res.data);
        setCode(res.data.starterCode || starterTemplates[language]);
      })
      .catch((err) => {
        console.error("Error loading question:", err);
        setQuestion({
          title: "Error loading question",
          description: "There was an issue fetching the question."
        });
      });
  }, [id]);

  // 🔥 FIXED: RUN CODE USING /api/playground/run
  const runCode = async () => {
    try {
      const res = await api.post("/api/playground/run", {
        language,
        code
      });
      setOutput(res.data.output);
    } catch (err) {
      console.error("Run error:", err);
      setOutput("Runtime Error");
    }
  };

  if (!question) return <div>Loading...</div>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "1fr auto",
        height: "90vh",
        gap: "10px"
      }}
    >
      {/* TOP SPLIT */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "14px"
        }}
      >
        {/* LEFT: QUESTION PANEL */}
        <div className="dark-card" style={{ overflowY: "auto" }}>
          <h2>{question.title}</h2>
          <p>{question.description}</p>

          <h3>Examples</h3>
          {question.examples?.map((e, i) => (
            <pre key={i}>{JSON.stringify(e, null, 2)}</pre>
          ))}

          {question.constraints && (
            <>
              <h3>Constraints</h3>
              <pre>{question.constraints}</pre>
            </>
          )}
        </div>

        {/* RIGHT: EDITOR PANEL */}
        <div
          className="dark-card"
          style={{ display: "flex", flexDirection: "column" }}
        >
          {/* Language selector */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8
            }}
          >
            <select
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
                setCode(starterTemplates[e.target.value]);
              }}
              style={{
                padding: "8px",
                borderRadius: "8px",
                background: "#0f172a",
                color: "#fff",
                border: "1px solid #334155"
              }}
            >
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              <option value="java">Java</option>
              <option value="c">C</option>
            </select>

            <button className="btn blue" onClick={runCode}>
              Run
            </button>
          </div>

          {/* Code editor textarea */}
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{
              flex: 1,
              width: "100%",
              background: "#0b1220",
              color: "#ffffff",
              padding: "12px",
              borderRadius: "12px",
              border: "1px solid #1e293b",
              resize: "none"
            }}
          />
        </div>
      </div>

      {/* OUTPUT PANEL */}
      <div className="dark-card" style={{ height: "150px", overflowY: "auto" }}>
        <h3>Output</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
}
