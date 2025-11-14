import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return;
    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch {
      // handled in context
    }
  };

  return (
    <div className="main-content">
      <div className="card" style={{ maxWidth: "420px", margin: "2rem auto" }}>
        <h2>Login</h2>
        <p style={{ fontSize: "0.9rem", opacity: 0.8, marginTop: "0.25rem" }}>
          Practice interview questions and track your progress.
        </p>
        <form onSubmit={handleSubmit} style={{ marginTop: "1rem", display: "grid", gap: "0.75rem" }}>
          <div>
            <label style={{ fontSize: "0.85rem" }}>Email</label>
            <input
              className="input"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label style={{ fontSize: "0.85rem" }}>Password</label>
            <input
              className="input"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p style={{ marginTop: "1rem", fontSize: "0.85rem" }}>
          New here? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
