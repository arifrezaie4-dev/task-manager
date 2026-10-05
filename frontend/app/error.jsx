"use client";

export default function Error({ error, reset }) {
  return (
    <div className="container text-center py-5">
      <h2>Something went wrong!</h2>

      <p className="text-muted">
        An unexpected error occurred.
      </p>

      <button
        className="btn btn-primary"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}