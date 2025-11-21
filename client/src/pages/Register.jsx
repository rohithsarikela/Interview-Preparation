import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import heroImg from "../assets/image.png";

const Register = () => {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
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
            <div className="field">
              <label className="label">Name</label>
              <input
                className="input"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label className="label">Email</label>
              <div className="input-with-icon">
                <input
                  className="input"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <span className="input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 8.5L12 13L21 8.5" stroke="#6B7280" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="#6B7280" strokeWidth="1.2"/>
                  </svg>
                </span>
              </div>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <div className="input-with-icon">
                <input
                  className="input"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <button type="button" className="input-icon btn-icon" onClick={() => setShowPassword(s => !s)} aria-label="Toggle password visibility"> 
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" stroke="#6B7280" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="3" stroke="#6B7280" strokeWidth="1.2"/>
                  </svg>
                </button>
              </div>
            </div>

            <button className="btn primary-btn" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Sign Up"}
            </button>

            <div className="divider"><span>Or</span></div>

            <div className="socials">
              <button type="button" className="social-btn" onClick={() => { window.location.href = '/api/auth/google'; }}>
                <span className="social-icon">G</span>
                Continue with Google
              </button>
              <button type="button" className="social-btn" onClick={() => { window.location.href = '/api/auth/apple'; }}>
                <span className="social-icon"></span>
                Continue with Apple
              </button>
              <button type="button" className="social-btn" onClick={() => { window.location.href = '/api/auth/facebook'; }}>
                <span className="social-icon">f</span>
                Continue with Facebook
              </button>
            </div>

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
