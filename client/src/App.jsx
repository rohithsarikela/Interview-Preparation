import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import QuestionBank from "./pages/QuestionBank";
import QuestionDetail from "./pages/QuestionDetail";
import DailyChallenge from "./pages/DailyChallenge";
import MockInterview from "./pages/MockInterview";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import CodingPlayground from "./pages/CodingPlayground";
import QuestionSolvePage from "./pages/QuestionSolvePage";

import { useAuth } from "./context/AuthContext";

const App = () => {
  const { user, authReady } = useAuth();

  return (
    <div className="app-container">
      <BrowserRouter>

        {/* ✅ Navbar only appears AFTER auth loads + user exists */}
        {authReady && user && <Navbar />}

        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/questions"
            element={
              <ProtectedRoute>
                <QuestionBank />
              </ProtectedRoute>
            }
          />

          <Route
            path="/questions/:id"
            element={
              <ProtectedRoute>
                <QuestionDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="/daily"
            element={
              <ProtectedRoute>
                <DailyChallenge />
              </ProtectedRoute>
            }
          />

          <Route
            path="/mock"
            element={
              <ProtectedRoute>
                <MockInterview />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
  path="/solve/:id"
  element={
    <ProtectedRoute>
      <QuestionSolvePage />
    </ProtectedRoute>
  }
/>


          {/* Public coding page */}
          <Route path="/playground" element={<CodingPlayground />} />

          {/* 404 */}
          <Route path="*" element={<div className="main-content">404</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
