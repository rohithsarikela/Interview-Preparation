import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import heroImg from "../assets/image.png";
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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
    <div className="snout-hero">
      <aside className="snout-left">
        <img src={heroImg} alt="Illustration" className="snout-image" />
      </aside>

      <main className="snout-right">
        <div className="snout-card">
          <div className="auth-top">
            <div className="toggle-tabs">
              <button className="tab active">Login</button>
              <button className="tab" onClick={() => navigate('/register')}>Sign Up</button>
            </div>
          </div>
          <h1 className="snout-title">Login</h1>
          <p className="snout-sub">Practice interview questions and track your progress.</p>

          <form className="snout-form" onSubmit={handleSubmit}>
            <label className="field-label">Email</label>
            <div className="field-row">
              <input
                name="email"
                type="email"
                className="field-input"
                value={form.email}
                onChange={handleChange}
                required
              />
              <span className="field-icon"> 
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 8.5L12 13L21 8.5" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="#E5E7EB" strokeWidth="1.2"/>
                </svg>
              </span>
            </div>

            <label className="field-label">Password</label>
            <div className="field-row">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                className="field-input"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button type="button" className="field-icon btn-eye" onClick={() => setShowPassword(s => !s)} aria-label="Toggle password">
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3L21 21" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" stroke="#6B7280" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="3" stroke="#6B7280" strokeWidth="1.2"/></svg>
                )}
              </button>
            </div>

            <div className="forgot-wrap"><Link to="/forgot" className="forgot-link">Forgot Password?</Link></div>

            <button className="btn-login" type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Log In'}</button>

            <div className="divider"><span>Or</span></div>

            <div className="social-list">
              <button type="button" className="social-btn" onClick={() => { window.location.href = `${API_BASE}/api/auth/google`; }}>
                <span className="social-left">G</span>
                Continue with Google
              </button>

              <button type="button" className="social-btn" onClick={() => { window.location.href = `${API_BASE}/api/auth/apple`; }}>
                <span className="social-left"></span>
                Continue with Apple
              </button>

              <button type="button" className="social-btn" onClick={() => { window.location.href = `${API_BASE}/api/auth/facebook`; }}>
                <span className="social-left">f</span>
                Continue with Facebook
              </button>
            </div>

            <p className="auth-switch">New here? <Link to="/register">Create an account</Link></p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
