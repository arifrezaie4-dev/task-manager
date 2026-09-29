"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import { authService } from "@/services/authService";
import { AuthContext } from "@/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await authService.login({
        email,
        password,
      });

      login(response.access_token);

      await Swal.fire({
        title: "Success!",
        text: "You are signed in successfully.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      router.push("/dashboard");
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
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading && (
            <span className="spinner-border spinner-border-sm me-1" />
          )}

          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <p className="text-center mt-4">
        Don't have an account?{" "}
        <Link href="/register">Register</Link>
      </p>
    </>
  );
}