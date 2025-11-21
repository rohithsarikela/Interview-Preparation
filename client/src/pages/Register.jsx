import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import heroImg from "../assets/image.png";

const Register = () => {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return;
    if (form.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    try {
      await register(form.name, form.email, form.password);
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
          <h2>Create Account</h2>
          <p className="auth-subtitle">Start solving questions and track your interview readiness.</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div>
              <label className="label">Name</label>
              <input
                className="input"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
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
              {loading ? "Creating..." : "Sign Up"}
            </button>
          </form>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
