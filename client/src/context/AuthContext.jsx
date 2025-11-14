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

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await api.post("/api/auth/login", { email, password });
      setUser({ _id: data._id, name: data.name, email: data.email });
      setToken(data.token);
      localStorage.setItem("user", JSON.stringify({ _id: data._id, name: data.name, email: data.email }));
      localStorage.setItem("token", data.token);
      toast.success("Logged in successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const { data } = await api.post("/api/auth/register", {
        name,
        email,
        password
      });
      setUser({ _id: data._id, name: data.name, email: data.email });
      setToken(data.token);
      localStorage.setItem("user", JSON.stringify({ _id: data._id, name: data.name, email: data.email }));
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

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logged out");
  };

  const value = { user, token, loading, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
