import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import heroImg from "../assets/image.png";

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
    <div className="auth-hero">
      <div className="hero-left">
        <img src={heroImg} alt="Hero" className="hero-image" />
      </div>

      <div className="hero-right">
        <div className="card auth-card">
          <h2>Login</h2>
          <p className="auth-subtitle">Practice interview questions and track your progress.</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div>
              <label className="label">Email</label>
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
              <label className="label">Password</label>
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

          <p className="auth-footer">
            New here? <Link to="/register">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
