"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import { authService } from "@/services/authService";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

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

      router.push("/login");
    } catch (error) {
      await Swal.fire({
        title: "Failed!",
        text: "Check if the email or password is correct!",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });

      console.error(error);
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
            required
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
            required
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
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-success w-100"
          disabled={loading}
        >
          {loading && (
            <span className="spinner-border spinner-border-sm me-2" />
          )}

          {loading ? "Signing up..." : "Create Account"}
        </button>
      </form>

      <p className="text-center mt-4">
        Already have an account?{" "}
        <Link href="/login">Login</Link>
      </p>
    </>
  );
}