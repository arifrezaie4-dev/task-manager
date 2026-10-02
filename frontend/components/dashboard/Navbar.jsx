"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { FaBars } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "@/context/AuthContext";

export default function Navbar() {
  const { logout } = useContext(AuthContext);
  const router = useRouter();

  const handleClick = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "LogOut",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) {
      return;
    }

    logout();
    router.push("/login");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-4 m-2 mb-3">
      <div className="d-flex align-items-center justify-content-between">
        <button
          className="btn btn-outline-light d-md-none me-3"
          data-bs-toggle="offcanvas"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
        >
          <FaBars />
        </button>

        <span className="navbar-brand mb-0 h1">
          TaskFlow
        </span>
      </div>

      <span className="navbar-brand">
        <button
          className="btn btn-danger"
          onClick={handleClick}
        >
          Log out
        </button>
      </span>
    </nav>
  );
}