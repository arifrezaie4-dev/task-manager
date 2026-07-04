import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await authService.login({
        email,
        password,
      });
      console.log(response);
      localStorage.setItem("token", response.access_token);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <h3 className="text-center mb-4">Welcome Back</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>

          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Password</label>

          <input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-primary w-100" disabled={loading}>
          {loading && (
            <div className="spinner-border spinner-border-sm me-1"></div>
          )}
          {loading ? "Signing In..." : "Sign In"}
        </button>
        {/* <button className="btn btn-primary w-100" disabled={loading}>
          {loading && (
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
          )}

          {loading ? "Signing In..." : "Sign In"}
        </button> */}
      </form>

      <p className="text-center mt-4">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </>
  );
};
