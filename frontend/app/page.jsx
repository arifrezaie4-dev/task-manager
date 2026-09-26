import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>TaskFlow</h1>

      <Link href="/login">Login</Link>
      <br />
      <Link href="/register">Register</Link>
      <br />
      <Link href="/dashboard">Dashboard</Link>
    </div>
  );
}