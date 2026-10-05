import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container text-center py-5">
      <h1 className="display-1 fw-bold">404</h1>

      <h2>Page Not Found</h2>

      <p className="text-muted mb-4">
        The page you are looking for does not exist.
      </p>

      <Link href="/" className="btn btn-primary">
        Go Home
      </Link>
    </div>
  );
}