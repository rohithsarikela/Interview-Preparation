import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // hide navbar on auth pages
  if (location.pathname === "/login" || location.pathname === "/register" || location.pathname.startsWith("/auth")) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      style={{
        borderBottom: "1px solid #1f2937",
        padding: "0.75rem 1rem",
        backdropFilter: "blur(16px)",
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: "rgba(15,23,42,0.9)"
      }}
    >
      <div
        style={{
          maxWidth: "1024px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Link to={user ? "/dashboard" : "/"} style={{ fontWeight: 700, fontSize: "1.1rem" }}>
          <span style={{ color: "#60a5fa" }}>Interview</span>Prep
        </Link>

        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          {user && (
            <>
              <Link to="/questions">Questions</Link>
              <Link to="/daily">Daily Challenge</Link>
              <Link to="/mock">Mock Interview</Link>
              <Link to="/profile">Profile</Link>
            </>
          )}

          {user ? (
            <>
              <span style={{ fontSize: "0.9rem", opacity: 0.8 }}>
                {user.name}
              </span>
              <button className="btn btn-secondary" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary">
                Login
              </Link>
              <Link to="/register" className="btn">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
