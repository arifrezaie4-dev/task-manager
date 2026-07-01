import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      username,
      email,
      password,
    });
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

        <button className="btn btn-success w-100">Create Account</button>
      </form>

      <p className="text-center mt-4">
        Already have an account? <Link to="/">Login</Link>
      </p>
    </>
  );
};

export default Register;
