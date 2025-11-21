import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("theme") || "light";
    } catch {
      return "light";
    }
  });

  // hide navbar on auth pages
  if (location.pathname === "/login" || location.pathname === "/register" || location.pathname.startsWith("/auth")) {
    return null;
  }

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("theme-light", "theme-dark");
    root.classList.add(theme === "dark" ? "theme-dark" : "theme-light");
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="app-navbar">
      <div className="navbar-inner">
        <Link to={user ? "/dashboard" : "/"} className="brand">
          <span className="brand-accent">Interview</span>Prep
        </Link>

        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? "🌙" : "☀️"}
          </button>

          {user && (
            <>
              <Link to="/questions" className="nav-link">Questions</Link>
              <Link to="/daily" className="nav-link">Daily</Link>
              <Link to="/mock" className="nav-link">Mock</Link>
              <Link to="/profile" className="nav-link">Profile</Link>
            </>
          )}

          {user ? (
            <>
              <span className="nav-username">{user.name}</span>
              <button className="btn btn-ghost" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost">Login</Link>
              <Link to="/register" className="btn">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
