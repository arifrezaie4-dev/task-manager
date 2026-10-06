import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import Swal from "sweetalert2";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await authService.register({
        username,
        email,
        password,
      });
      await Swal.fire({
        title: "Success!",
        text: "You are now signed up.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/login");
    } catch (error) {
      await Swal.fire({
        title: "Failed!",
        text: "Check if the email or password is Correct!",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
      throw error
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h3 className="text-center mb-4">Create Account</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>

          <input
            type="text"
            className="form-control"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

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

        <button className="btn btn-success w-100" disabled={loading}>
          {loading && (
            <div
              className="spinner-border spinner-border-sm me-2"
              role="status"
            ></div>
          )}
          {loading ? "Signing up..." : "Create Account"}
        </button>
      </form>

      <p className="text-center mt-4">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </>
  );
};

export default Register;
