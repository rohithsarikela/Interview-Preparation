import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/apiClient";
import toast from "react-hot-toast";

export default function AuthSuccess() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (!token) {
      toast.error("OAuth failed: no token received");
      setLoading(false);
      return;
    }

    (async () => {
      try {
        localStorage.setItem("token", token);
        // now fetch the user
        const { data } = await api.get("/api/auth/me");
        localStorage.setItem("user", JSON.stringify(data));
        toast.success("Logged in via OAuth");
        navigate("/dashboard");
      } catch (err) {
        toast.error("OAuth processing failed");
        setLoading(false);
      }
    })();
  }, [navigate]);

  return (
    <div className="main-content">
      {loading ? <p>Signing you in...</p> : <p>OAuth failed. Please try again.</p>}
    </div>
  );
}
