"use client";

import { FaHome, FaTasks, FaUser, FaUsers } from "react-icons/fa";
import Link from "next/link";

export default function Sidebar({ tasksRef }) {
  return (
    <div className="bg-light border-end p-3 sidebar h-md-0">
      <h5>Menu</h5>

      <ul className="nav flex-column">
        <li className="nav-item">
          <Link
            href="/dashboard"
            className="nav-link"
          >
            <FaHome className="me-2" />
            Dashboard
          </Link>
        </li>

        <li className="nav-item">
          <button
            className="nav-link btn btn-link text-start"
            onClick={() =>
              tasksRef.current?.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            <FaTasks className="me-2" />
            Tasks
          </button>
        </li>

        <li className="nav-item">
          <Link
            href="/teams"
            className="nav-link"
          >
            <FaUsers className="me-2" />
            Teams
          </Link>
        </li>

        <li className="nav-item">
          <Link
            href="/profile"
            className="nav-link"
          >
            <FaUser className="me-2" />
            Profile
          </Link>
        </li>
      </ul>
    </div>
  );
}