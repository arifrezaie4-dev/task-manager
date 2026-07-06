import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    try {
      setLoading(true);
      logout();
      navigate("/login");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container mt-5">
      <h1>Dashboard</h1>
      <p>You are logged in 🎉</p>
      <button className="btn btn-sm btn-primary" onClick={() => handleClick()}>
        {loading && (
          <div className="spinner-border spinner-border-sm me-2"></div>
        )}
        {loading ? "logging out" : "Log Out"}
      </button>
    </div>
  );
};
