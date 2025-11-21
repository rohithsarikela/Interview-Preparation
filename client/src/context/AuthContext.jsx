import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/apiClient";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const [authReady, setAuthReady] = useState(false);

  // -----------------------------
  // LOGIN
  // -----------------------------
  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await api.post("/api/auth/login", { email, password });

      const userData = { _id: data._id, name: data.name, email: data.email };

      setUser(userData);
      setToken(data.token);

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", data.token);

      toast.success("Logged in successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // REGISTER
  // -----------------------------
  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const { data } = await api.post("/api/auth/register", {
        name,
        email,
        password,
      });

      const userData = { _id: data._id, name: data.name, email: data.email };

      setUser(userData);
      setToken(data.token);

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", data.token);

      toast.success("Registered successfully");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        "Registration failed";
      toast.error(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // LOGOUT
  // -----------------------------
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logged out");
  };

  // -----------------------------
  // TOKEN VERIFICATION ON FIRST LOAD
  // -----------------------------
  useEffect(() => {
    let mounted = true;

    const init = async () => {
      const existingToken = localStorage.getItem("token");

      // No token stored → directly mark auth as ready
      if (!existingToken) {
        if (mounted) setAuthReady(true);
        return;
      }

      try {
        const { data } = await api.get("/api/auth/me");
        if (mounted) {
          const userData = {
            _id: data._id,
            name: data.name,
            email: data.email,
          };

          setUser(userData);
          setToken(existingToken);
        }
      } catch (err) {
        // Invalid/expired token → clear everything
        if (mounted) {
          setUser(null);
          setToken(null);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }
      } finally {
        if (mounted) setAuthReady(true); // Mark auth system ready
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, []);

  const value = { user, token, loading, authReady, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
