import { FaHome, FaTasks, FaUser, FaUsers } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = ({tasksRef}) => {
  return (
    <div
      className="bg-light border-end p-3 sidebar h-md-0"
    >
      <h5>Menu</h5>

      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink
            to={"/dashboard"}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            href="#"
          >
            <FaHome className="me-2"></FaHome>
            Dashboard
          </NavLink>
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
          <FaTasks className="me-2"></FaTasks>
            Tasks
          </button>
        </li>

        <li className="nav-item">
          <NavLink
          to={"/teams"}
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <FaUsers className="me-2"></FaUsers>
          Teams
        </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
          to={"/profile"}
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
          href="#"
        >
        <FaUser className="me-2"></FaUser>
          Profile
        </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
